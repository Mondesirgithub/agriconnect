import { useState, useEffect } from 'react';
import localForage from 'localforage';

const isObjectLiked = (value) =>
  value.constructor.name === 'Array' || value.constructor.name === 'Object';

const rehydrate = (value, defaultValue?) => {
  if (!value) return defaultValue;

  if (isObjectLiked(value)) {
    return value;
  }

  try {
    const parse = JSON.parse(value);
    return parse;
  } catch (err) {
    return defaultValue;
  }
};

const hydrate = (value) => {
  if (!isObjectLiked(value)) {
    return value;
  }
  return JSON.stringify(value);
};

const createMigration = (opts, data) => {
  return new Promise((resolve, reject) => {
    const key = `${opts.key}-${opts.userId}-version`;
    localForage.getItem(key, (err, version) => {
      if (version !== opts.version) {
        data = opts.migrate(data);
        localForage.setItem(opts.key, rehydrate(data), (err) => {
          if (err) return reject(err);
          localForage.setItem(key, opts.version, (err) => {
            if (err) return reject(err);
            return resolve(data);
          });
        });
      } else {
        resolve(data);
      }
    });
  });
};

const config = {
  key: '@session-medsy',
  migrate: (state) => {
    return { ...state };
  },
};

export const useStorage = (state, setState) => {
  const [rehydrated, setRehydrated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      const userId = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).id
        : null;

      if (!userId) {
        // Handle the case where there is no user ID
        setRehydrated(true);
        return;
      }


      await localForage.getItem(`${config.key}-${userId}`, (err, value) => {
        if (err) {
          setRehydrated(true);
          return setError(err);
        }

        const restoredValue = rehydrate(value);

        if (typeof config.migrate === 'function') {
          createMigration({ ...config, userId }, restoredValue)
            .then((data) => setState(data))
            .then(() => setRehydrated(true));
        } else {
          setState(restoredValue);
          setRehydrated(true);
        }
      });
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).id
      : null;
  
    if (!userId) {
      // Handle the case where there is no user ID
      return;
    }
  
    localForage.setItem(`${config.key}-${userId}`, hydrate(state));
  }, [state]);  

  return {
    rehydrated,
    error,
  };
};

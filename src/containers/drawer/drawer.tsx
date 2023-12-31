import React, { useContext } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import ProductDetails from './views/product-details';
import Cart from './views/cart';
import Checkout from './views/checkout';
import dynamic from 'next/dynamic'
 
const NoSSRDrawerMenu = dynamic(() => import('./views/menus'), { ssr: false })

export const CartDrawer = () => {
  const { state, dispatch } = useContext(DrawerContext);

  const handleClose = () =>
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false,
      },
    });

  const drawerComponent = (state) => {
    if (state?.open1 === true) {
      return <Cart />;
    }

    if (state?.showDetails === true) {
      return <ProductDetails />;
    }

    if (state?.showCart === true) {
      return <Cart />;
    }

    if (state?.showCart1 === true) {
      return <Cart />;
    }

    if (state?.showCheckout === true) {
      return <Checkout />;
    }

    if (state?.showCheckout1 === true) {
      return <Checkout />;
    }

    return <Cart />;
  };

  return (
    <React.Fragment>
      {state?.open === true ? (
        <div className="overlay" role="button" onClick={handleClose} />
      ) : (
        ''
      )}
      <div
        className={`drawer drawer-cart ${state?.open === true ? 'open' : ''}`}
      >
        {drawerComponent(state)}
      </div>
    </React.Fragment>
  );
};

export const Drawer = () => {
  const { state, dispatch }: any = useContext(DrawerContext);
  const handleClose = () =>
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: false,
      },
    });

  return (
    <React.Fragment>
      {state?.menu === true ? (
        <div
          className="overlay overlay-menu"
          role="button"
          onClick={handleClose}
        />
      ) : (
        ''
      )}
      <div
        className={`drawer drawer-menu ${state?.menu === true ? 'open' : ''}`}
      >
        <NoSSRDrawerMenu/>
      </div>
    </React.Fragment>
  );
};

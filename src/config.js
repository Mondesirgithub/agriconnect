const config = {
    development: {
      apiUrl: 'http://127.0.0.1:8000',
      client : 'http://127.0.0.1:3000',
    },
    production: {
      apiUrl: 'https://agriconnectapi.pythonanywhere.com',
      client: 'https://agriconnect-p9y4-b840r3rac-mondesirs-projects-ddd8386f.vercel.app',
    },
  };
  
module.exports = config.production;
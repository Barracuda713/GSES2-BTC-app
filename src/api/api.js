import apiRoutes from './routes/routes.js';

const initApi = (app, baseApiPath) => {
  app.use(baseApiPath, apiRoutes);
};

export { initApi };

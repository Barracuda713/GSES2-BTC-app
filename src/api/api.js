import { ApiPath } from '../common/enums/enums.js';
import { rateRouter, subscribeRouter, mailRouter } from './routes/routes.js';

const initApi = (app, baseApiPath) => {
  app.use(`${baseApiPath}${ApiPath.RATE}`, rateRouter);
  app.use(`${baseApiPath}${ApiPath.SUBSCRIBE}`, subscribeRouter);
  app.use(`${baseApiPath}${ApiPath.SEND_EMAILS}`, mailRouter);
};

export { initApi };

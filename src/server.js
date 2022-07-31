import express from 'express';
import cors from 'cors';

import { ENV, ExitCode } from './common/enums/enums.js';
import { errorHandlerMiddleware } from './middlewares/middlewares.js';

import { initDb } from './config/config.js';
import { initApi } from './api/api.js';

initDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initApi(app, ENV.APP.API_PATH);

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await app.listen(ENV.APP.PORT, () => {
      console.log(`Server listening on port ${ENV.APP.PORT}!`);
    });
  } catch (err) {
    console.error(err);
    process.exit(ExitCode.ERROR);
  }
};
startServer();

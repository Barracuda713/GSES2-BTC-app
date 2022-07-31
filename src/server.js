import express from 'express';
import cors from 'cors';
import multer from 'multer';

import { ENV, ExitCode, HttpCode } from './common/enums/enums.js';
import { errorHandlerMiddleware } from './middlewares/middlewares.js';

import { initDb } from './config/config.js';
import { initSMTP } from './smtp.transporter.js';
import { initApi } from './api/api.js';

initDb();
initSMTP();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 

initApi(app, ENV.APP.API_PATH);

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = HttpCode.NOT_FOUND;
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

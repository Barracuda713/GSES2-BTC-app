import { HttpCode } from "../common/enums/enums.js";

/* eslint-disable no-unused-vars */
const errorHandlerMiddleware = (err, req, res, next) => {
  if (!res.headersSent) {
    const { status = HttpCode.INTERNAL_SERVER_ERROR, message = '' } = err;
    res.status(status).send({ error: true, message });
  }
};

export { errorHandlerMiddleware };

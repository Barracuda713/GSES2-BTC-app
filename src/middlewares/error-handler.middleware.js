/* eslint-disable no-unused-vars */
const errorHandlerMiddleware = (err, req, res, next) => {
  if (!res.headersSent) {
    console.error(err.stack)
    const { status = 500, message = '' } = err;
    res.status(status).send({ error: true, message });
  }
};

export { errorHandlerMiddleware };

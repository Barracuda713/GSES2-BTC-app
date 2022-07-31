const responseMiddleware = (req, res, next) => {
  if (res.err) {
    res.status(res.err.status).send({
      "error": true,
      "message": res.err.message
    })
  }
  if (res.data) {
    res.send(res.data);
  }
  next();
}

export { responseMiddleware };

const handleError = (res, status, message) => {
  res.status(status).send(message);
};

module.exports = {
  handleError,
};

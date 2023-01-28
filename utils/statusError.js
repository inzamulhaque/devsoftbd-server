const statusError = (message, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
module.exports = { statusError };

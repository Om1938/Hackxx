module.exports.SomeErrorOccured = (
  msg = 'Some Error Occured',
  status = 400
) => {
  const err = new Error(msg);
  err.status = status;
  return err;
};

module.exports.notFound = (msg, append = 'Not Found.') => {
  const err = new Error(msg + append);
  err.status = 404;
  return err;
};

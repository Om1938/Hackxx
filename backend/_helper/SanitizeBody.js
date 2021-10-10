const sanitizer = require('sanitizer');
const sanitizeBody = (req, res, next) => {
  const x = Object.entries(req.body).reduce((_acc, val) => {
    const sanitizedObj = sanitizer.sanitize(val[1]);
    _acc[val[0]] = sanitizedObj;
    return _acc;
  }, {});
  req.body = x;
  next();
};
module.exports = sanitizeBody;

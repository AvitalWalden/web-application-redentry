const jwt = require("jsonwebtoken");

exports.signJwt = function (object, keyName, options) {
  return jwt.sign(object, keyName, {
    ...(options && options),
  });
};

exports.verifyJwt = function (token, keyName) {
  try {
    const decoded = jwt.verify(token, keyName);
    return decoded;
  } catch (error) {
    return null;
  }
};

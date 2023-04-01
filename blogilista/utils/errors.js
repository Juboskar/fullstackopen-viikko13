function ValueError(value) {
  return {
    name: "ValueError",
    message: `Missing or incorrect value: ${value}`,
  };
}

function NotFoundError(value) {
  return {
    name: "NotFoundError",
    message: `${value} not found`,
  };
}

function NotUniqueError(value) {
  return {
    name: "NotUniqueError",
    message: `${value} already exists`,
  };
}

function NotAuthorizedError(value) {
  return {
    name: "NotAuthorizedError",
    message: `Authorization failed: ${value}`,
  };
}

module.exports = { ValueError, NotFoundError, NotUniqueError, NotAuthorizedError };

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
    message: `${value} not unique`,
  };
}

module.exports = { ValueError, NotFoundError, NotUniqueError };

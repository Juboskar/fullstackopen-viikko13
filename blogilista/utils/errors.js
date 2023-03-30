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

module.exports = { ValueError, NotFoundError };

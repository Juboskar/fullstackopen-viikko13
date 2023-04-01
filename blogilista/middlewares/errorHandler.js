const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === "ValueError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "NotFoundError") {
    return res.status(404).json({ error: error.message });
  }
  if (error.name === "NotUniqueError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "NotAuthorizedError") {
    return res.status(401).json({ error: error.message });
  }
  if (error.name === "SequelizeValidationError") {
    if (
      error.message ===
      "Validation error: Validation isEmail on username failed"
    )
      return res.status(400).json({
        error: `${error.errors[0].value} is not a valid email address`,
      });
    if (
      (error.message === "Validation error: Validation min on year failed") |
      (error.message === "Validation error: Validation max on year failed")
    )
      return res.status(400).json({
        error: `Year must be between 1991 and ${new Date().getFullYear()}`,
      });
  }
  return res.status(500).json({ error: "Unknown error occurred" });
};

module.exports = errorHandler;

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValueError") {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json("Unknown error occurred");
};

module.exports = errorHandler;

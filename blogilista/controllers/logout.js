require("express-async-errors");
const router = require("express").Router();

const { NotAuthorizedError } = require("../utils/errors");
const User = require("../models/user");
const tokenExtractor = require("../middlewares/tokenExtractor");

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findOne({
    where: { id: req.decodedToken.id },
  });
  if (!user) throw new NotFoundError(`User: ${username}`);
  user.session = null;
  const updated = await user.save();
  res.json(updated);
});

module.exports = router;

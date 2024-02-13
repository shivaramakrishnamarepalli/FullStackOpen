const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const UserModel = require("../models/user.js");
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jsonwebtoken.sign(userForToken, process.env.SECRET);
  res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});
module.exports = loginRouter;

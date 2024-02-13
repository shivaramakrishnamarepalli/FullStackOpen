const logger = require("../utils/logger.js");
const UserModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      id: 1,
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});
userRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.username || !body.password) {
      res
        .status(400)
        .json({ error: "username or password is not provided" });
      return;
    }
    if (body.username.length < 3 || body.password.length < 3) {
      res
        .status(400)
        .json({ error: "username or password length must be 3 atleast" });
      return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new UserModel({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;

const logger = require("../utils/logger.js");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogs.js");
const User = require("../models/user.js");
const router = require("express").Router();
const middleware = require("../utils/middleware");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    if (blogs) {
      logger.info("Blogs fetched successfully!");
      res.json(blogs);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware.userExtractor, async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ ...req.body, user: user._id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const user = await User.findById(decodedToken.id);
    const userId = user.id;
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog.user.toString() === userId.toString()) {
      const blogDeleted = await Blog.findByIdAndDelete(id);
      if (blogDeleted) {
        logger.info(`${blogDeleted.title} ${blogDeleted.author} deleted successfully!`);
        res.status(204).end();
      }
    } else {
      res.status(400).json({ error: "Invalid user" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const updatedBlogData = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlogData, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

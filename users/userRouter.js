const express = require("express");

const router = express.Router();
const UserDb = require("./userDb");
const PostDb = require("../posts/postDb");

/**
 * METHOD: POST
 * ROUTE: /api/users/
 * PURPOSE: Create new user
 */
router.post("/", validateUser, async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = await UserDb.insert({ name });

    if (newUser) {
      return res
        .status(201)
        .json({ status: "success", message: "User Created Successfully" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Error creating user" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error creating user" });
  }
});

/**
 * METHOD: POST
 * ROUTE: /api/users/:id/posts
 * PURPOSE: Create new post for a user
 */
router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const { text } = req.body;

    const newPost = await PostDb.insert({ user_id: req.user.id, text });
    if (newPost) {
      return res
        .status(201)
        .json({ status: "success", message: "Post Created Successfully" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Error creating post for user" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error creating post for user" });
  }
});

/**
 * METHOD: GET
 * ROUTE: /api/users/
 * PURPOSE: Get all users
 */
router.get("/", async (req, res) => {
  try {
    const users = await UserDb.get();
    if (users.length > 0) {
      return res.json({ status: "success", data: users });
    }

    return res
      .status(404)
      .json({ status: "error", message: "Users not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error getting users" });
  }
});

/**
 * METHOD: GET
 * ROUTE: /api/users/:id
 * PURPOSE: Get single user by id
 */
router.get("/:id", validateUserId, async (req, res) => {
  try {
    return res.json({
      status: "success",
      data: req.user,
      message: "User gotten successfully"
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error getting user detail" });
  }
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await UserDb.getById(id);

  if (!user) {
    return res.status(400).json({ message: "invalid user id" });
  }

  req.user = user;
  next();
}

function validateUser(req, res, next) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: "missing user data" });
  }

  if (!body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }

  next();
}

function validatePost(req, res, next) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: "missing post data" });
  }

  if (!body.text) {
    return res.status(400).json({ message: "missing required text field" });
  }

  next();
}

module.exports = router;

const express = require("express");

const router = express.Router();
const UserDb = require("./userDb");

/**
 * METHOD: POST
 * ROUTE: /api/users/
 * PURPOSE: Create new post
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

router.post("/:id/posts", validatePost, (req, res) => {
    try {
        console.log(req.user)
    } catch (error) {
        return res
      .status(500)
      .json({ status: "error", message: "Error creating user" });
    }
});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {});

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

  if (!body.name) {
    return res.status(400).json({ message: "missing required text field" });
  }

  next();
}

module.exports = router;

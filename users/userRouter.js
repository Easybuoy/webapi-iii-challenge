const express = require("express");

const router = express.Router();
const UserDb = require("./userDb");

router.post("/", (req, res) => {});

router.post("/:id/posts", validateUser, (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await UserDb.getById(id);
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "invalid user id" });
  }

  req.user = user;
  next();
}

function validateUser(req, res, next) {
    const {body} = req;

    if (!body) {
        return res.status(400).json({ message: "missing user data" });
    }

    if (!body.name) {
        return res.status(400).json({ message: "missing required name field" });
    }

    next();
}

function validatePost(req, res, next) {
    const {body} = req;

    if (!body) {
        return res.status(400).json({ message: "missing post data" });
    }

    if (!body.name) {
        return res.status(400).json({ message: "missing required text field" });
    }

    next();
}

module.exports = router;

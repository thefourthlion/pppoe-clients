const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logUsers,
  deleteUser,
} = require("../controllers/auth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUsers").get(logUsers);
router.route("/delete/:id").delete(deleteUser);
module.exports = router;

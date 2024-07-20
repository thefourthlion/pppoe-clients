const express = require("express");
const router = express.Router();
const {
  createpppoe,
  readpppoe,
  readpppoeFromID,
  updatepppoe,
  deletepppoe,
} = require("../controllers/pppoe");
router.route("/create").post(createpppoe);
router.route("/read").get(readpppoe);
router.route("/read/:id").get(readpppoeFromID);
router.route("/update/:id").post(updatepppoe);
router.route("/delete/:id").delete(deletepppoe);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createpppoe,
  readpppoe,
  readpppoeFromID,
  readpppoeFromMikrotikName,
  updatepppoeLabel,
  updatepppoe,
  deletepppoe,
} = require("../controllers/pppoe");
router.route("/create").post(createpppoe);
router.route("/read").get(readpppoe);
router.route("/read/:id").get(readpppoeFromID);
router.route("/read/mikrotikName/:mikrotikName").get(readpppoeFromMikrotikName);
router.route("/update/:id").post(updatepppoe);
router.route("/update/label/:id").post(updatepppoeLabel);
router.route("/delete/:id").delete(deletepppoe);
module.exports = router;

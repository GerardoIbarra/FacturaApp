// routes/router.js
const express = require("express");
const {
  listCfdi,
  cancelCfdi,
  sendEmailCfdi,
  createCfdi,
} = require("../controllers/cfdiController");

const router = express.Router();

router.get("/list", listCfdi);
router.post("/cancel/:cfdiUid", cancelCfdi);
router.get("/cfdi/:cfdiUid/email", sendEmailCfdi);
router.post("/cfdi40/create", createCfdi);

module.exports = router;

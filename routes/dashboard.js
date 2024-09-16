const express = require("express");
const router = express.Router();
const jwtVerify = require("../middelwere/jwtverify");

router.get("/dashboard", jwtVerify, (req, resp) => {
  resp.status(200).json("this is dash board");
});

module.exports = router;

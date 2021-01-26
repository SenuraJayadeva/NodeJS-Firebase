const express = require("express");
const { addStudent } = require("../controllers/student.controller");

const router = express.Router();

router.post("/add", addStudent);

module.exports = router;

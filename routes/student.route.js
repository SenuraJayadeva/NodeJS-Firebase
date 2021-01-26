const express = require("express");
const {
  addStudent,
  getAllStudents,
} = require("../controllers/student.controller");

const router = express.Router();

router.post("/add", addStudent);
router.get("/", getAllStudents);

module.exports = router;

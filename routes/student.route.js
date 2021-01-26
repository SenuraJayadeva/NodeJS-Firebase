const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudent,
  getStudentByITnumber,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

const router = express.Router();

router.post("/add", addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.get("/findbyitnum/:id", getStudentByITnumber);
router.put("/update/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;

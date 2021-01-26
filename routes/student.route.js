const express = require("express");
const auth = require("../middleware/auth");

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

// Routes restricted with authetication (JWT Token)
router.post("/addbyadmin", auth, addStudent);
router.get("/getallbyadmin", auth, getAllStudents);
router.get("/getbyadmin/:id", auth, getStudent);
router.get("/getbyadmin/findbyitnum/:id", auth, getStudentByITnumber);
router.put("/updatebyadmin/:id", auth, updateStudent);
router.delete("/deletebyadmin/:id", auth, deleteStudent);

module.exports = router;

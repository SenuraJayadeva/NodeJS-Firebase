"use strict";

const firebase = require("../db");
const Student = require("../models/Student.model");
const firestore = firebase.firestore();

const addStudent = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("students").doc().set(data);
    res.send("Recored saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const students = await firestore.collection("students");
    const data = await students.get();
    const studentsArray = [];
    if (data.empty) {
      res.status(404).send("No Student Record Found");
    } else {
      data.forEach((doc) => {
        const student = new Student(
          doc.id,
          doc.data().itnum,
          doc.data().name,
          doc.data().age
        );
        studentsArray.push(student);
      });
      res.send(studentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
};

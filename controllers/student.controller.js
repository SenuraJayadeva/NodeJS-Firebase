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

module.exports = {
  addStudent,
};

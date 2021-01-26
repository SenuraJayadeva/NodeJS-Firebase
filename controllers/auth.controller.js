"use strict";
let bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const firebase = require("../db");
const Admin = require("../models/Admin.model");
const firestore = firebase.firestore();

const registerAdmin = async (req, res) => {
  let { email, password } = req.body;

  try {
    //See if user Exist
    // Make the initial query
    let query = await firestore
      .collection("admins")
      .where("email", "==", email)
      .get();

    if (!query.empty) {
      let snapshot = query.docs[0];
      let user = snapshot.data();
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    } else {
      //Encrypt Password

      //10 is enogh..if you want more secured.user a value more than 10
      let salt = await bcrypt.genSalt(10);

      //hashing password
      password = await bcrypt.hash(password, salt);

      //save user to the database

      try {
        let user = {
          email,
          password,
        };
        await firestore.collection("admins").doc().set(data);
        //res.send("Recored saved successfully");

        //Return jsonwebtoken

        let payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    // Make the initial query
    let query = await firestore
      .collection("admins")
      .where("email", "==", email)
      .get();

    if (!query.empty) {
      let snapshot = query.docs[0];
      let user = snapshot.data();
      //match the user email and password

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = { registerAdmin, loginAdmin };

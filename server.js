const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api Running"));

//Define Routes

//-------------------Senura---------------------
app.use("/api/student", require("./routes/student.route"));
app.use("/api/admin", require("./routes/auth.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

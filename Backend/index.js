const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const registerRoutes = require("./routes/Auth/Registeration");
const LoginRoutes = require("./routes/Auth/Login");
const AddTourRoutes = require("./routes/Tour/Tour");

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "https://tour-sadhik.netlify.app",//"http://localhost:3001"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(LoginRoutes);
app.use(registerRoutes);
app.use(AddTourRoutes);
app.get("/", (req, res) => {
  res.send("server running successfuly");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

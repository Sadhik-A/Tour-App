const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const registerRoutes = require("./routes/Auth/Registeration");
const LoginRoutes = require("./routes/Auth/Login");
const AddTourRoutes = require("./routes/Tour/Tour");
const passportcontrol=require("./passport/Passport");
const passport = require("passport");
const session = require("express-session");
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret : "secret",
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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

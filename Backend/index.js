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

// Middleware
app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your client's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and headers with credentials
  })
);
app.use(express.json());


// Routes
app.use(LoginRoutes);
app.use(registerRoutes);
app.use(AddTourRoutes);


// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

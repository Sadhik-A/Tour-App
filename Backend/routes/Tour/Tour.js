const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Tourcontrol = require("../../Controller/Tour");
const middleware = require("../../jwt/jwt");
router.get("/api/getTours", (req, res) => {
  Tourcontrol.getTourlist(req, res);
});
router.delete("/api/deleteTour/:id", middleware.verifyToken, (req, res) => {
  if (req.is_admin) {
    Tourcontrol.deleteTour(req, res);
  }
  else{
    res.status(401).json("You are not authorized to delete tour");
  }
});
router.post(
  "/api/addTour",
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Tourcontrol.add(req, res);
  }
);
router.put("/api/editTour",middleware.verifyToken, (req, res) => {
   console.log(req.is_admin);
  if (req.is_admin) {
    Tourcontrol.editTour(req, res);
  } else {
    res.status(401).json("You are not authorized to edit tour");
  }
});
module.exports = router;

const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Tourcontrol = require("../../Controller/Tour");
const middleware = require("../../jwt/jwt");
router.get("/api/getTours", (req, res) => {
  Tourcontrol.getTourlist(req, res);
});
router.delete("/api/deleteTour/:id", middleware.verifyToken,Tourcontrol.deleteTour);
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
router.put("/api/editTour", middleware.verifyToken, Tourcontrol.editTour);
router.post("/api/likeTour/:id", Tourcontrol.likeTour);
router.post("/api/dislikeTour/:id", Tourcontrol.dislikeTour);
module.exports = router;

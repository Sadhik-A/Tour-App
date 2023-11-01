
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Registercontrol=require('../../Controller/Registerion')

router.post('/api/register',[
  //console.log(req.body),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Registercontrol.register(req, res);
  }
);
router.get("/users/:id/verify/:token", (req, res) => { 
  Registercontrol.verify(req, res);
})
module.exports = router;
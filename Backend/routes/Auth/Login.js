const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Logincontrol=require('../../Controller/Login')

router.post(
  '/api/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Logincontrol.jwtlogin(req, res);
  }
);

module.exports = router;
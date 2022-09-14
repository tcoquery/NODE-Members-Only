const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

router.get('/', function(req, res, next) {
    res.render('index', {title: "express"});
});

router.post('/', function(req, res, next) {

  body("first_name", "First name must not be empty")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("last_name", "Last name must not be empty")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("email", "Email must not be empty")
  .isEmail()
  .normalizeEmail()
  body("password", "Password must not be empty")
  .trim()
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .custom(async (confirmPassword, {req}) => {
    const password = req.body.password

    // If password and confirm password not same
    // don't allow to sign up and throw error
    if(password !== confirmPassword){
      throw new Error('Passwords must be same')
    }
  }),

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      membership: false
    }).save(err => {
      if (err) { 
        return next(err);
      }
      res.redirect("/home");
    });
  });
});

router.get('/home', function(req, res, next) {
  res.render('home');
});


  module.exports = router;
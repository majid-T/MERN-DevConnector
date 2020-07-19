const express = require("express");
const router = express.Router();
const gravator = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");

// @route       POST api/users
// @desc        Register user
// @access      Public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should be 6 or more charachters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //Checking for inputs to be valid
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destrcut values form post
    const { name, email, password } = req.body;

    try {
      //Check for user if registered before
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist!" }] });
      }

      //Get user gravatar
      const avatar = gravator.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Create user instance
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save user to DB
      await user.save();

      //Respond back with a token
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((error) => {
      return error.msg;
    });
    return res.status(422).json({
      error: errorArray,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: ["Invalid Email"],
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWTKey,
        {
          expiresIn: "30d",
        }
      );

      const responseUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        follow: user.logs,
        followers: user.followers,
        image: user.image,
        created: user.created_at,
      };
      return res.status(200).json({
        msg: ["Successfully Logged In"],
        token,
        user: responseUser,
      });
    } else {
      return res.status(401).json({
        error: ["Invalid Password"],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ["Server Error, Please Try Again Later"],
    });
  }

  res.status(200).send("Login");
};

exports.register = async (req, res) => {
  const { email, name, password, confirmPassword, type } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((error) => {
      return error.msg;
    });
    return res.status(422).json({
      error: errorArray,
    });
  }

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.json({
        error: "User Already Exist!",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        error: "Password Doesn't Match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      name,
      password: hashedPassword,
      type,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWTKey,
      {
        expiresIn: "100 days",
      }
    );

    res.json({
      msg: "Account Successfully Created",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

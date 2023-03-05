const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exitUser = await userModel.findOne({ email: email });
    if (exitUser) {
      return res.status(400).json({ message: "user already exits" });
    }
    const hashPassord = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      name: name,
      email: email,
      password: hashPassord,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exitingUser = await userModel.findOne({ email: email });
    if (!exitingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(
      password,
      exitingUser.password
    );
    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Please Fill the correct information" });
    }
    const token = jwt.sign(
      { email: exitingUser.email, id: exitingUser._id },
      process.env.SECRET_KEY
    );
    res.status(201).json({ user: exitingUser, token: token });
  } catch (error) {}
};
module.exports = { signUp, signIn };

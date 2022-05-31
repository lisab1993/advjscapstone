const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { loginValidator, signupValidator } = require("../middleware/validators");
const handleValidationErrors = require("../middleware/handleValidationErrors");

const router = Router();

//signup
router.post(
  "/signup",
  [...signupValidator, handleValidationErrors],
  async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username: username });
    if (userExists)
      return res.status(400).send({ errors: ["That username is taken."] });

    const user = await User.signup(username, password);
    res.send(user.sanitize());
  }
);

//login
router.post(
  "/login",
  [...loginValidator, handleValidationErrors],
  async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !user.verifyLoginPassword(password)) {
      return res.status(401).send({ errors: ["Invalid username or password"] });
    }
    const token = jwt.sign(user.sanitize(), process.env.SECRET_KEY);

    res.send({ token, user: user.sanitize() });
  }
);

module.exports = router;

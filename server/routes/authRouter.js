const {register, signup, verification, login} = require("../controller/authController");
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.post('/signup', signup);
router.post('/otp', verification);

module.exports = router;
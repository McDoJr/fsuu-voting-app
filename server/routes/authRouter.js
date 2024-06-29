const {register, signup, verification, login, updateProfile, deleteData} = require("../controller/authController");
const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.post('/signup', signup);
router.post('/otp', verification);
router.post('/profile/update', updateProfile);
router.post('/facebook_data_deletion', deleteData);

module.exports = router;
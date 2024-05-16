const {registerExecutive, registerLocal, registerNominee, getExecutives, getLocal, getAllLocal, getAll, updateNominee,
    getAllVoters, getHistory, addHistory
} = require("../controller/adminController");
const router = require('express').Router();

router.post('/insert/executive', registerExecutive);
router.post('/insert/local', registerLocal);
router.post('/insert/nominees', registerNominee);
router.post('/get/executive', getExecutives);
router.post('/get/local', getLocal);
router.post('/get/local-all', getAllLocal);
router.post('/get/all', getAll);
router.post('/update', updateNominee);
router.post('/get/voters', getAllVoters);
router.post('/get/history', getHistory);
router.post('/put/history', addHistory);

module.exports = router;
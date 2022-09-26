const { Router } = require('express');

const router = Router();

const {
  registerUser,
  loginUser,
} = require('../controllers/auth');

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validDni, validEmail } = require('../helpers/dbValidators');

const router = Router();

const {
  registerUser,
  loginUser,
} = require('../controllers/auth');

router.post('/signup', [
  check('name', 'name is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('birthDate', 'birthDate is required').not().isEmpty(),
    check('dni', 'dni is required').not().isEmpty(),
    check('typeUser', 'typeUser is required').not().isEmpty(),
    check('password', 'password length should be 6 or more').isLength({ min: 6 }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( validEmail ),
    check('dni').custom( validDni ),
    validateFields
], registerUser);
router.post('/login', loginUser);

module.exports = router;

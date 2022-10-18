const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validDni, validEmail, validUserById } = require('../helpers/dbValidators');
const { userGet, 
        userPut, 
        userPost, 
        userDelete,
        userById
} = require('../controllers/user');
const { ensureAuth } = require('../helpers/jwt');

const router = Router();

router.get('/', [
        ensureAuth
], userGet);

router.get('/:id', [
        ensureAuth,
        check('id', 'Not valid ID').isMongoId(),
        check('id').custom(validUserById),
        validateFields
], userById);

router.put('/:id', [
        ensureAuth,
        check('id', 'Not valid ID').isMongoId(),
        check('id').custom(validUserById),
        validateFields
], userPut);

router.post('/', [
        ensureAuth,
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
], userPost);

router.delete('/:id', [
        ensureAuth,
        check('id', 'Not valid ID').isMongoId(),
        check('id').custom(validUserById),
],userDelete);



module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validRole, validEmail, validUserById } = require('../helpers/dbValidators');

const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
        check('id', 'Not valid ID').isMongoId(),
        check('id').custom(validUserById),
        check('role').custom( validRole ),
        validateFields
],userPut);

router.post('/', [
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password length should be 6 or more').isLength({ min: 6 }),
        check('email', 'Invalid email').isEmail(),
        check('email').custom( validEmail ),
        check('role').custom( validRole ),
        validateFields
], userPost);

router.delete('/:id', [
        check('id', 'Not valid ID').isMongoId(),
        check('id').custom(validUserById),
        validateFields
],userDelete);

router.patch('/', userPatch);



module.exports = router;
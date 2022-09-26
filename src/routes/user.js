const { Router } = require('express');

const { userGet, 
        userPut, 
        userPost, 
        userDelete,
        userById
} = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.get('/:id', userById);

router.put('/:id', userPut);

router.post('/', userPost);

router.delete('/:id', userDelete);



module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { ensureAuth } = require('../helpers/jwt');
const { lessonPost, lessonGet, lessonById, lessonByLevel, lessonPut, lessonDelete } = require('../controllers/lessons');
const { validQA } = require('../helpers/qaValidators');
const { validLessonById } = require('../helpers/dbValidators');

const router = Router();

router.get('/', [
  ensureAuth,
], lessonGet)

router.get('/:id', [
  ensureAuth,
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom(validLessonById),
  validateFields
], lessonById)

router.get('/level/:level', [
  ensureAuth
], lessonByLevel)

router.post('/', [
  ensureAuth,
  check('title', 'title is required').not().isEmpty(),
  check('level', 'level is required').not().isEmpty(),
  check('link', 'link is required').not().isEmpty(),
  check('qa', 'qa is required').not().isEmpty(),
  check('qa').custom( validQA ),
  validateFields,
], lessonPost)

router.put('/:id', [
  ensureAuth,
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom(validLessonById),
  validateFields
], lessonPut)

router.delete('/:id', [
  ensureAuth,
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom(validLessonById),
  validateFields
], lessonDelete)

module.exports = router;
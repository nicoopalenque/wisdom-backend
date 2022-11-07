const { Router } = require('express');
const { check } = require('express-validator');
const { coursePost, courseGet, courseById } = require('../controllers/course');
const { validLessons, validPrice } = require('../helpers/courseValidators');
const { validCourseById } = require('../helpers/dbValidators');
const { ensureAuth } = require('../helpers/jwt');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/', [
  ensureAuth,
], courseGet)

router.get('/:id', [
  ensureAuth,
  check('id', 'Not valid ID').isMongoId(),
  check('id').custom(validCourseById),
  validateFields
], courseById)

router.post('/', [
  ensureAuth,
  check('title', 'title is required').not().isEmpty(),
  check('lessons', 'lessons is required').not().isEmpty(),
  check('date', 'date is required').not().isEmpty(),
  check('price', 'price is required').not().isEmpty(),
  check('lessons').custom(validLessons),
  check('price').custom(validPrice),
  validateFields,
], coursePost)

module.exports = router;
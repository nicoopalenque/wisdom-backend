const { response } = require('express');
const { saveCourse, getCourses, getCourseById } = require('../services/course');

const courseGet = async (req, res = response) => {
  const { limit = 5, since = 0, status = true } = req.query;
  const query = { status };

  const course = await getCourses(limit, since, query);

  res.json(course);
}

const courseById = async (req, res = response) => {
  const { id } = req.params;
  const course = await getCourseById(id);

  res.json(course);
}

const coursePost = async (req, res = response) => {
  const payload = req.body;

  const course = await saveCourse(payload);

  res.json(course)
}

module.exports = {
  coursePost,
  courseGet,
  courseById
}
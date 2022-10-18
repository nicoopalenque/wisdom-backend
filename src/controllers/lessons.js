const { response } = require('express');
const { saveLesson, getLesson, getLessonById, getLessonByLevel, updateLesson, deleteLesson } = require('../services/lesson');

const lessonGet = async (req, res = response) => {
  const { limit = 5, since = 0, status = true } = req.query;
  const query = { status };

  const user = await getLesson(limit, since, query);

  res.json(user)
}

const lessonById = async (req, res = response) => {
  const { id } = req.params;
  const lesson = await getLessonById(id);
  
  res.json(lesson);
}

const lessonByLevel = async (req, res = response) => {
  const { level } = req.params;

  const lesson = await getLessonByLevel(level.toUpperCase());

  res.json(lesson)
}

const lessonPost = async(req, res = response) => {
  const payload = req.body;

  payload.level = payload.level.toUpperCase();
  
  const lesson = await saveLesson(payload)
  
  res.json(lesson)
}

const lessonPut = async (req, res = response) => {
  const { id } = req.params;
  const payload = req.body;

  const lesson = await updateLesson(id, payload);

  res.json(lesson)
}

const lessonDelete = async (req, res = response) => {
  const { id } = req.params;

  const lesson = await deleteLesson(id);

  res.json(lesson);
}

module.exports = {
  lessonPost,
  lessonGet,
  lessonById,
  lessonByLevel,
  lessonPut,
  lessonDelete
}
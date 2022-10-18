const Lesson = require('../models/lesson');

const getLesson = async (limit, since, query) => {
  const [ count, lessons ] = await Promise.all([
    Lesson.countDocuments(query),
    Lesson.find(query)
        .skip(Number( since ))
        .limit(Number( limit ))
  ]);

  return {
    count,
    lessons
  }
}

const getLessonById = async(id) => {
  return await Lesson.findById(id);
}

const getLessonByLevel = async (level) => {
  return await Lesson.findOne({ level })
}

const saveLesson = async (payload) => {
  const {
    title,
    level,
    description = '',
    link,
    qa
  } = payload;
  
  const lesson = new Lesson({
    title,
    level,
    description,
    link,
    qa
  });

  await lesson.save();

  return lesson;
}

const updateLesson = async (id, payload) => {
  const { _id, ...resto } = payload;

  const lesson = await Lesson.findByIdAndUpdate(id, resto);

  return lesson;
}

const deleteLesson = async (id) => {
  const lesson = await Lesson.findByIdAndUpdate(id, { status: false });
  return lesson;
}

module.exports = {
  saveLesson,
  getLesson,
  getLessonById,
  getLessonByLevel,
  updateLesson,
  deleteLesson
}
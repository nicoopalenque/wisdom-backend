const Course = require('../models/course');

const getCourses = async(limit, since, query) => {
  const [ count, courses ] = await Promise.all([
    Course.countDocuments(query),
    Course.find(query)
      .skip(Number(since))
      .limit(Number(limit))
  ])

  return {
    count,
    courses
  }
}

const getCourseById = async(id) => {
  return await Course.findById(id);
}

const saveCourse = async (payload) => {
  const {
    title,
    description = '',
    lessons,
    date,
    price
  } = payload;

  const course = new Course({
    title,
    description,
    lessons,
    date,
    price
  });

  await course.save();

  return course;
} 

module.exports = {
  saveCourse,
  getCourses,
  getCourseById
}
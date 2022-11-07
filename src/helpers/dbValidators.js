const Lesson = require('../models/lesson');
const User = require('../models/user');
const Course = require('../models/course');

const validEmail = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) throw new Error(`Email ${email}, already exist`)
} 

const validUserById = async(id = '') => {
    const userExist = await User.findById(id);
    if (!userExist) throw new Error(`ID ${id} dont exist`)
} 

const validDni = async (dni = '') => {
    const existDni = await User.findOne({ dni });
    if (existDni) throw new Error(`DNI ${dni}, already exist`);
} 

const validLessonById = async (id = '') => {
    const existLesson = await Lesson.findById(id);
    if(!existLesson) throw new Error(`ID ${id} dont exist`);
}

const validCourseById = async (id = '') => {
    const existCourse = await Course.findById(id);
    if(!existCourse) throw new Error(`ID ${id} dont exist`);
}

module.exports = {
    validDni,
    validEmail,
    validUserById,
    validLessonById,
    validCourseById
}
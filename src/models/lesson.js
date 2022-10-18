const { Schema, model } = require('mongoose');

const LessonSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: false
  },
  level: {
    type: String,
    required: [true, 'Level is required']
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
  },
  qa: {
    type: Object,
    default: {}
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

LessonSchema.methods.toJSON = function() {
  const { __v, ...lesson } = this.toObject();
  return lesson;
}

module.exports = model('Lesson', LessonSchema);
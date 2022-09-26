const { Schema, model } = require('mongoose');

const LessonSchema = Schema({

})

LessonSchema.methods.toJSON = function() {
  const { __v, ...lesson } = this.toObject();
  return lesson;
}

module.exports = model('Lesson', LessonSchema);
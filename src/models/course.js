const { Schema, model } = require('mongoose');

const CourseSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: false
  },
  lessons: {
    type: Array,
    default: []
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  price: {
    type: Object,
    default: {}
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

CourseSchema.methods.toJSON = function () {
  const { __v, ...course } = this.toObject();
  return course;
}

module.exports = model('Course', CourseSchema);
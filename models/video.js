const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  category: {
    type: String,
    lowercase: true,
    enum: ['physics', 'math', 'chemistry', 'biology', 'engineering'],
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  short_description: {
    type: String,
    required: true,
  },
  long_description: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  authors: {
    type: [String],
    default: ['First Last'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  language: {
    type: String
  },
});

// const Video = mongoose.model('Video', VideoSchema);
// Video.insertMany([
//   {
//     category: 'Physics',
//     title: 'Physics 101',
//     short_description: 'Intro to Physics',
//     long_description: 'Introduction to Physics',
//     profession: 'STEM',
//     price: 1.0,
//   },
//   {
//     category: 'Math',
//     title: 'Math 101',
//     short_description: 'Intro to Math',
//     long_description: 'Introduction to Mathematics',
//     profession: 'STEM',
//     price: 1.0,
//   },
//   {
//     category: 'Chemistry',
//     title: 'Chem 101',
//     short_description: 'Intro to Chem',
//     long_description: 'Introduction to Chemistry',
//     profession: 'STEM',
//     price: 1.0,
//   },
// ]).then((data) => {
//   console.log(data);
// });

module.exports = mongoose.model('Video', VideoSchema);

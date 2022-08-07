// let's define our schema here
const mongoose = require('mongoose');

//let's design our schema
/*
{
  content: string
  isCompleted: boolean
}
*/

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = todoSchema;

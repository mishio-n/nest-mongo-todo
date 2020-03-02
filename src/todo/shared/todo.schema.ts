import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
  user: String,
  task: String,
  memo: String,
  deadline: Date,
  createdAt: Date,
  updatedAt: Date,
  isDone: Boolean,
});

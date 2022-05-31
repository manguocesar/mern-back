import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isDev: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);

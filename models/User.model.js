const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    campus: {
      type: String,
      enum: [
        'Madrid',
        'Barcelona',
        'Miami',
        'Paris',
        'Berlin',
        'Amsterdam',
        'México',
        'Sao Paulo',
        'Lisbon',
      ],
    },
    couser: {
      type: String,
      enum: ['Web Dev', 'UX/UI', 'Data Analytics'],
    },
    image: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;

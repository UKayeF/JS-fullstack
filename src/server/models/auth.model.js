const mongoose = require('mongoose');

const { Schema } = mongoose;

const authSchema = new Schema({
    user: Schema.ObjectId,
    pass: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
)

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth;

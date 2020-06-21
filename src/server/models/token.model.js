const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
    user: Schema.ObjectId,
    token: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
)

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token;

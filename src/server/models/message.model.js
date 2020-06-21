const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  from: Schema.ObjectId,
  to: Schema.ObjectId,
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
},
{ timestamps: true },
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;

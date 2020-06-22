const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactsSchema = new Schema({
    user: Schema.ObjectId,
    contact: Schema.ObjectId,
  },
  { timestamps: true },
)

const Contact = mongoose.model('Contact', contactsSchema)

module.exports = Contact;

const router = require('express').Router();
const Contact = require('../models/contacts.model');
const User = require('../models/user.model');

router.route('/').get(async (req, res) => {
  const { user } = req.query;
  const { id } = await User.findOne({ username: user });

  const contacts = await Contact.find({ user: id });
  if (!contacts) {
    res.status(400).json('No contacts found!');
    return;
  }

  const contactsOnly = contacts.map((_, index) => contacts[index].contact);
  res.json(contactsOnly);
})

router.route('/').post(async (req, res) => {
  const { user, contact } = req.body;
  const ownId = await User.findOne({ username: user });
  const contactId = await User.findOne({ username: contact });

  const contactExistsAlready = await Contact.find({
    $or: [{ user: ownId }, { contact: contactId }],
  })
  if (contactExistsAlready) {
    res.status(400).json('Contact exists already!');
    return;
  }

  const newContact = new Contact({ user: ownId, contact: contactId });
  const otherContact = new Contact({ user: contactId, contact: ownId });

  Contact.insertMany(newContact, otherContact)
    .then(() => res.json('Contacts registered!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/').delete(async (req, res) => {
  const { user, contact } = req.body;
  const ownId = await User.findOne({ username: user });
  const contactId = await User.findOne({ username: contact });

  const contactExistsAlready = await Contact.find({
    $or: [{ user: ownId }, { contact: contactId }],
  })
  if (!contactExistsAlready) {
    res.status(400).json('Contact does not exist!');
    return;
  }

  Contact.deleteMany({
    $or: [{user: ownId, contact: contactId}, {user: contactId, contact: ownId}]
  })
    .then(() => res.json('Contact successfully deleted!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

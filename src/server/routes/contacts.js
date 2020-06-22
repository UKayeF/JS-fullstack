const router = require('express').Router();
const Contact = require('../models/contacts.model');
const User = require('../models/user.model');

router.route('/').get(async (req, res) => {
  const { user } = req.query;
  const userFromDB = await User.findOne({ username: user });

  if(!user) {
    Contact.find()
      .then(contacts => res.json(contacts))
      .catch(err => res.status(400).json(`Error: ${err}`))
    return;
  }


  const { id } = userFromDB;
  const contacts = await Contact.find({ user: id });
  if (!contacts) {
    res.status(400).json('No contacts found!');
    return;
  }

  const contactsOnly = contacts.map((_, index) => contacts[index].contact);
  const contactNames = (await Promise.all(
    contactsOnly.map(contactId => User.findById(contactId))
  )).map(contact => contact && contact.username)

  res.json(contactNames);
})

router.route('/').post(async (req, res) => {
  const { user, contact } = req.body;
  if (user === contact){
    res.status(400).json('User cannot add himself as contact');
    return;
  }
  const ownUser = await User.findOne({ username: user });
  const contactUser = await User.findOne({ username: contact });

  if (!ownUser || !contactUser){
    res.status(400).json('User does not exist!');
    return;
  }

  const ownId = ownUser.id;
  const contactId = contactUser.id;

  const contactExistsAlready = await Contact.findOne({
    $or: [{ user: ownId, contact: contactId }, { user: contactId, contact: ownId }],
  })
  if (contactExistsAlready) {
    res.status(400).json('Contact exists already!');
    return;
  }

  const newContact = new Contact({ user: ownId, contact: contactId });
  const otherContact = new Contact({ user: contactId, contact: ownId });

  Contact.insertMany([newContact, otherContact])
    .then(() => res.json('Contacts registered!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/').delete(async (req, res) => {
  const { user, contact } = req.body;
  const ownUser = await User.findOne({ username: user });
  const contactUser = await User.findOne({ username: contact });

  if (!ownUser || !contactUser){
    res.status(400).json('User does not exist!');
    return;
  }

  const ownId = ownUser.id;
  const contactId = contactUser.id;

  const contactExistsAlready = await Contact.findOne({
    $or: [{ user: ownId, contact: contactId }, { user: contactId, contact: ownId }],
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

module.exports = router;

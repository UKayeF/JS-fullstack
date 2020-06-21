const router = require('express').Router();
const Message = require('../models/message.model');
const Token = require('../models/token.model');
const User = require('../models/user.model');

router.route('/send').post((req, res) => {
  const { from, to, title, body } = req.body;

  const newMessage = new Message({ from, to, title, body });

  newMessage.save()
    .then(() => res.json('Message sent!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/').get(async (req, res) => {
  const userToken = req.query.token;
  const matchingToken = await Token.findOne({ 'token': userToken });

  if (!matchingToken) {
    res.status(401).json('Invalid token!');
    return;
  }

  const { id } = await User.findById(matchingToken.user);

  Message.find({ $or: [{ 'to': id }, { 'from': id }] })
    .then(messages => res.json(messages.concat(id)))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;

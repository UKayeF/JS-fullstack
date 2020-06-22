const router = require('express').Router();
const Message = require('../models/message.model');
const Token = require('../models/token.model');
const User = require('../models/user.model');

router.route('/send').post(async (req, res) => {
  const { from, to, title, body } = req.body;
  const sender = await User.findOne({username: from})
  const recipient = await User.findOne({username: to});

  if (!sender || !recipient) {
    res.status(400).json('Recipient/Sender not found!');
    return;
  }

  const newMessage = new Message({ from: sender, to: recipient, title, body });

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

  const messages = await Message.find({ $or: [{ 'to': id }, { 'from': id }] });
  if (!messages) {
    res.status(400).json(`Error: ${err}`);
    return;
  }

  const usernames = await Promise.all(
    messages.flatMap(({from, to}) => [
      User.findById(from),
      User.findById(to),
    ])
  )

  const messagesWithUserNames = messages.map(
    ({from, to, ...message}, index) => ({
      from: (usernames[index*2] || {}).username,
      fromId: messages[index].from,
      to: (usernames[index*2+1] || {}).username,
      toId: messages[index].toId,
      body: messages[index].body,
      title: messages[index].title,
      createdAt: messages[index].createdAt,
    })
  );

  res.json(messagesWithUserNames);
})

module.exports = router;

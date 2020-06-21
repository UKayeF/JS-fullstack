const router = require('express').Router();
const Message = require('../models/message.model');

router.route('/send').post((req, res) => {
  const { from, to, title, body } = req.body;

  const newMessage = new Message({from, to, title, body});

  newMessage.save()
    .then(() => res.json('Message sent!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/').get((req, res) => {
  const userToken = req.query.token;

  Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;

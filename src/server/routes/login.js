const router = require('express').Router();
const Message = require('../models/message.model');
const Auth = require('../models/auth.model');

router.route('/').post((req, res) => {
  const { user, pass } = req.body;

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

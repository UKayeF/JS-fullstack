const router = require('express').Router();
const Token = require('../models/token.model');
const Auth = require('../models/auth.model');
const User = require('../models/user.model');
const { hexString } = require('../utils/random');

router.route('/:id').get((req, res) => {
  Token.findById(req.params.id)
    .then(token => res.json(token))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/:id').delete((req, res) => {
  Token.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json('Token deleted!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/').delete((req, res) => {
  Token.deleteMany()
    .then(() => res.status(204).json('All tokens deleted!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/').post(async (req, res) => {
  const { user, pass } = req.body;

  const { id } = await User.findOne({'username': user})
  const existingEntry = await Auth.findOne({ 'user': id })
  if (!existingEntry) {
    res.status(500).json(`No user entry with id ${id} found!`);
    return;
  }

  if (pass !== existingEntry.pass){
    const { user, pass } = existingEntry;
    res.status(401).json(`${user} ${pass}`);
    return;
  }

  const tokenString = hexString(32);
  const newToken = new Token({token: tokenString, user: existingEntry.user})

  newToken.save()
    .then(() => res.json(tokenString))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/').get((req, res) => {
  Token.find()
    .then(tokens => res.json(tokens))
    .catch((err) => res.status(400).json(`Error: ${err}`));
})

module.exports = router;

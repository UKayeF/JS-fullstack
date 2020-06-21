const router = require('express').Router();
const Token = require('../models/token.model');
const Auth = require('../models/auth.model');
const { hexString } = require('../utils/random');

router.route('/:id').get((req, res) => {
  Token.findById(req.params.id)
    .then(token => res.json(user))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/').post(async (req, res) => {
  const { user, pass } = req.body;

  const existingEntry = Auth.find({ 'user.username': user })
  if (!existingEntry) {
    res.status(500).json('No user entry found!');
    return;
  }

  if (pass !== existingEntry.pass){
    res.status(401).json('Password invalid!');
    return;
  }

  const tokenString = hexString(32);
  const newToken = new Token({token: tokenString, user: existingEntry.user})

  newToken.save()
    .then(() => res.json(tokenString))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;

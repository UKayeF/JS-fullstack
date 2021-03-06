const router = require('express').Router();
const Auth = require('../models/auth.model');
const User = require('../models/user.model');


router.route('/create').post(async (req, res) => {
  const { user, pass } = req.body;

  try {
    const existingUser = await User.findOne({ username: user });
    const existingPasswordEntry = await Auth.findOne({ 'user.id': existingUser.id })
    if (existingPasswordEntry) {
      res.status(500).json('Password already exists!');
      return;
    }
    const newEntry = new Auth({ user: existingUser, pass });
    newEntry.save()
      .then(() => res.json('Password created!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
  catch (e) {
    console.warn(e);
  }
})

router.route('/passwords').get((req, res) => {
  Auth.find()
    .then(passwords => res.json(passwords))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;

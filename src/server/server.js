const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const atob = a => Buffer.from(a, 'base64').toString('binary');
const btoa = b => Buffer.from(b).toString('base64');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const connections = {};

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (!err) console.log('Connection successful!');
}).then(state => {
  const { connections: [ firstConnection] } = state;
  const { user, pass } = firstConnection;

  console.log(btoa(`${user}:${pass}`))
})
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

app.post('/login', (req, res) => {
})
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

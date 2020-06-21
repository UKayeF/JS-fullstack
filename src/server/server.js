const { btoa } = require('./utils/polyfills');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const authRouter = require('./routes/auth')
const { createURI } = require('./utils/connection');

const app = express();
const port = process.env.PORT || 5000;
const uri = createURI('nils', 'adminslin');

require('dotenv').config();


app.use(cors());
app.use(express.json());

console.log(uri);
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

app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/auth', authRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

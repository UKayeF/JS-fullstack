const mongoose = require('mongoose');

const protocol = 'mongodb+srv';
const cluster = 'cluster0-7lpyy.gcp.mongodb.net';
const defaultDB = 'home';
const query = 'retryWrites=true&w=majority';

export const createURI = (user, pass, db = defaultDB) =>
  `${protocol}://${user}:${pass}@${cluster}/${db}?${query}`

function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  db.on('error', function (err){
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(err)}`);
    db.close().catch(
      () => console.log(`MongoDB :: failed to close connection ${this.name}`)
    )
  })

  db.on('connected', function(){
    mongoose.set('debug', function(col, method, query, doc) {
      console.log(`MongoDB :: ${this.conn.name} ${col}.${method}
      (${JSON.stringify(query)},${JSON.stringify(doc)}`)
    })
    console.log(`MongoDB :: connected ${this.name}`);
  })

  db.on('disconnected', function (){
    console.log(`MongoDB :: disconnected ${this.name}`);
  })

  return db;
}

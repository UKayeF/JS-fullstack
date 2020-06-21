const protocol = 'mongodb+srv';
const cluster = 'cluster0-7lpyy.gcp.mongodb.net';
const defaultDB = 'home';
const query = 'retryWrites=true&w=majority';

export const createURI = (user, pass, db = defaultDB) =>
  `${protocol}://${user}:${pass}@${cluster}/${db}?${query}`

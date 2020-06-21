const protocol = 'mongodb+srv';
const cluster = 'cluster0-7lpyy.gcp.mongodb.net';
const dbname = 'home';
const query = 'retryWrites=true&w=majority';

export const createURI = (user, pass) =>
  `${protocol}://${user}:${pass}@${cluster}/${dbname}?${query}`

const atob = a => Buffer.from(a, 'base64').toString('binary');
const btoa = b => Buffer.from(b).toString('base64');

module.exports = { atob, btoa };

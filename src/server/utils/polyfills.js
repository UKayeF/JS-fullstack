export const atob = a => Buffer.from(a, 'base64').toString('binary');
export const btoa = b => Buffer.from(b).toString('base64');

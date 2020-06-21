const hexString = length => Array(length).fill().map(
  () => Math.floor(Math.random() * 16).toString(16).join(''),
)

module.exports = { hexString };

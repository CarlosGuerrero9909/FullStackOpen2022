const palindrome = (string) => string
  .split('')
  .reverse()
  .join('');

const average = (array) => {
  const reducer = (sum, item) => sum + item;

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length;
};

/* const average = (array) => {

  const reducer = array.reduce((sum, item) => {
    return sum + item
  }, 0)

  return reducer / array.length
} */

module.exports = {
  palindrome,
  average,
};

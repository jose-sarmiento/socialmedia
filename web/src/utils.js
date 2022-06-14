const sort = (array) =>
  array.sort((a, b) => new Date(b.date) - new Date(a.date));
export default sort;

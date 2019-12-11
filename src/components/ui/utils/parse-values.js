export default (value, parsedItems, {uniqueKey, multiple}) => {
  let field = uniqueKey || 'label';
  if (multiple) {
    if (typeof value === 'string') {
      return [parsedItems.find(item => item[field] === value)];
    } else {
      return value.map(x => {
        if (typeof x === 'string' || x[field] || x[field] === 0)
          return parsedItems.find(item => item[field] === x || item[field] === x[field]);
      });
    }
  } else {
    return (typeof value === 'string' || value[field] || value[field] === 0) ?
      parsedItems.find(item => item[field] === value || item[field] === value[field]) :
      {};
  }
};

export default [
  {
    value: { orderBy: 'addition_time', order: 'desc' },
    label: 'newest first',
  },
  {
    value: { orderBy: 'addition_time', order: 'asc' },
    label: 'newest last',
  },
  {
    value: { orderBy: 'price', order: 'asc' },
    label: 'cheapest first',
  },
  {
    value: { orderBy: 'price', order: 'desc' },
    label: 'cheapest last',
  },
];

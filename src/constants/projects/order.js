export default [
  {
    value: { orderBy: 'creation_time', order: 'desc' },
    label: 'newest first',
  },
  {
    value: { orderBy: 'creation_time', order: 'asc' },
    label: 'newest last',
  },
  {
    value: { orderBy: 'proximity', order: 'asc' },
    label: 'soonest first',
  },
  {
    value: { orderBy: 'proximity', order: 'desc' },
    label: 'soonest last',
  },
];

const january = 0;
const august = 7;  // months are counted from 0
const semesterStartDate = 20;  // Innopolis semesters start on the 20th

const datePeriods = [
  {
    name: 'last week',
    getStart(end) {
      const start = new Date(end.valueOf());
      start.setDate(end.getDate() - 7);
      return start;
    },
  },
  {
    name: 'last month',
    getStart(end) {
      const start = new Date(end.valueOf());
      start.setMonth(end.getMonth() - 1);
      return start;
    },
  },
  {
    name: 'last 3 months',
    getStart(end) {
      const start = new Date(end.valueOf());
      start.setMonth(end.getMonth() - 3);
      return start;
    },
  },
  {
    name: 'last semester',
    getStart(end) {
      const fallSemesterStart = new Date(end.getFullYear(), august, semesterStartDate);
      const springSemesterStart = new Date(end.getFullYear(), january, semesterStartDate);

      if (end < fallSemesterStart) {
        return springSemesterStart;
      } else {
        return fallSemesterStart;
      }
    },
  },
  {
    name: 'last year',
    getStart(end) {
      const start = new Date(end.valueOf());
      start.setFullYear(end.getFullYear() - 1);
      return start;
    },
  },
  {
    name: 'all time',
    getStart(_end) {
      return new Date(0);
    },
  },
];

export default datePeriods;

import fecha from 'fecha';

export const parseDates = date => {
  if (date.start && date.end) {
    return parseTwoDates(date);
  } else if (date.start) {
    return fecha.format(new Date(date.start), 'YYYY-MM-DD');
  }
  return null;
};

const parseTwoDates = date => {
  let y1 = fecha.format(new Date(date.start), 'YYYY');
  let y2 = fecha.format(new Date(date.end), 'YYYY');

  let m1 = fecha.format(new Date(date.start), 'MMM');
  let m2 = fecha.format(new Date(date.end), 'MMM');

  let d1 = fecha.format(new Date(date.start), 'D');
  let d2 = fecha.format(new Date(date.end), 'D');

  let startThisYear = y1 === fecha.format(new Date(), 'YYYY');
  let endThisYear = y2 === fecha.format(new Date(), 'YYYY');
  let inOneYear = y1 === y2;
  let inOneMonth = m1 === m2;
  let inOneDay = d1 === d2;

  if (inOneYear) {
    if (startThisYear && endThisYear) {
      if (inOneMonth) {
        if (inOneDay) {
          // Jun 12
          return `${m1} ${d1}`;
        } else {
          // Jun 12 - 15
          return `${m1} ${d1} – ${d2}`;
        }
      } else {
        // Jun 12 - Jul 15
        return `${m1} ${d1} – ${m2} ${d2}`;
      }
    } else {
      if (inOneDay) {
        // Jan 12, 2020
        return `${m1} ${d1}, ${y1}`;
      } else {
        // Jun 12 - 15, 2020
        return `${m1} ${d2} – ${d2}, ${y1}`;
      }
    }
  } else {
    // Dec 25, 2019 - Jan 5, 2020
    return `${m1} ${d2}, ${y1} – ${m2} ${d2}, ${y2}`;
  }
};

export default parseTwoDates;

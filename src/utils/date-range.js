const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const parseDates = date => {
  if (date.start && date.end) {
    return formatDateRange(date);
  } else if (date.start) {
    let dateObj = new Date(date.start);
    return (
      dateObj.getFullYear() + '-'
      + ('' + dateObj.getMonth() + 1).padStart(2, '0') + '-'
      + ('' + dateObj.getDate() + 1).padStart(2, '0')
    );
  }
  return null;
};

export default function formatDateRange({start, end}) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();

  let y1 = startDate.getFullYear();
  let y2 = endDate.getFullYear();

  let m1 = months[startDate.getMonth()];
  let m2 = months[endDate.getMonth()];

  let d1 = startDate.getDate();
  let d2 = endDate.getDate();

  let startThisYear = y1 === now.getFullYear();
  let endThisYear = y2 === now.getFullYear();
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
      if (inOneMonth) {
        if (inOneDay) {
          // Jan 12, 2020
          return `${m1} ${d1}, ${y1}`;
        } else {
          // Jun 12 - 15, 2020
          return `${m1} ${d1} – ${d2}, ${y1}`;
        }
      } else {
        // Jun 12 - Jul 15, 2020
        return `${m1} ${d1} – ${m2} ${d2}, ${y1}`;
      }
    }
  } else {
    // Dec 25, 2019 - Jan 5, 2020
    return `${m1} ${d2}, ${y1} – ${m2} ${d2}, ${y2}`;
  }
}

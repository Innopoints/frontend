const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDateRange({start, end}) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();

  const y1 = startDate.getFullYear();
  const y2 = endDate.getFullYear();

  const m1 = months[startDate.getMonth()];
  const m2 = months[endDate.getMonth()];

  const d1 = startDate.getDate();
  const d2 = endDate.getDate();

  const startThisYear = y1 === now.getFullYear();
  const endThisYear = y2 === now.getFullYear();
  const inOneYear = y1 === y2;
  const inOneMonth = m1 === m2;
  const inOneDay = d1 === d2;

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

export function formatDate(date) {
  const dateObject = new Date(date);
  const now = new Date();

  const year = dateObject.getFullYear();
  const month = months[dateObject.getMonth()];
  const day = dateObject.getDate();

  const thisYear = year === now.getFullYear();

  if (thisYear) {
    // Jun 12
    return `${month} ${day}`;
  } else {
    // 12 Jun 2019
    return `${day} ${month} ${year}`;
  }
}

export function formatTimeRange({start, end}) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();

  const y1 = ('' + (startDate.getFullYear() % 100)).padStart(2, '0');
  const y2 = ('' + (endDate.getFullYear() % 100)).padStart(2, '0');

  const m1 = ('' + (startDate.getMonth() + 1)).padStart(2, '0');
  const m2 = ('' + (endDate.getMonth() + 1)).padStart(2, '0');

  const d1 = ('' + startDate.getDate()).padStart(2, '0');
  const d2 = ('' + endDate.getDate()).padStart(2, '0');

  const h1 = ('' + startDate.getHours()).padStart(2, '0');
  const h2 = ('' + endDate.getHours()).padStart(2, '0');

  const mn1 = ('' + startDate.getMinutes()).padStart(2, '0');
  const mn2 = ('' + endDate.getMinutes()).padStart(2, '0');

  const startThisYear = startDate.getFullYear() === now.getFullYear();
  const endThisYear = endDate.getFullYear() === now.getFullYear();
  const inOneYear = y1 === y2;
  const inOneMonth = m1 === m2;
  const inOneDay = d1 === d2;
  const sameTime = h1 === h2 && mn1 === mn2;

  if (inOneYear) {
    if (startThisYear && endThisYear) {
      if (inOneMonth && inOneDay) {
        if (sameTime) {
          // 13:37, 12.06
          return `${h1}:${mn1}, ${d1}.${m1}`;
        } else {
          // 13:37 – 14:48, 12.06
          return `${h1}:${mn1} – ${h2}:${mn2}, ${d1}.${m1}`;
        }
      } else {
        // 12.06 – 15.07
        return `${d1}.${m1} – ${d2}.${m2}`;
      }
    } else {
      if (inOneMonth && inOneDay) {
        if (sameTime) {
          // 13:37, 12.06.20
          return `${h1}:${mn1}, ${d1}.${m1}.${y1}`;
        } else {
          // 13:37 – 14:48, 12.06.20
          return `${h1}:${mn1} – ${h2}:${mn2}, ${d1}.${m1}.${y1}`;
        }
      } else {
        // 12.06.20 - 15.07.20
        return `${d1}.${m1}.${y1} – ${d2}.${m2}.${y2}`;
      }
    }
  } else {
    // 12.06.20 - 15.07.21
    return `${d1}.${m1}.${y1} – ${d2}.${m2}.${y2}`;
  }
}

export function formatTime(time) {
  const timeObject = new Date(time);
  const now = new Date();

  const year = ('' + (timeObject.getFullYear() % 100)).padStart(2, '0');
  const month = ('' + (timeObject.getMonth() + 1)).padStart(2, '0');
  const day = ('' + timeObject.getDate()).padStart(2, '0');
  const hour = ('' + timeObject.getHours()).padStart(2, '0');
  const minute = ('' + timeObject.getMinutes()).padStart(2, '0');

  const thisYear = year === now.getFullYear();

  if (thisYear) {
    // 13:37, 12.06
    return `${hour}:${minute}, ${day}.${month}`;
  } else {
    // 13:37, 12.06.20
    return `${hour}:${minute}, ${day}.${month}.${year}`;
  }
}

export function groupByColor(varieties) {
  const grouping = new Map();

  for (let variety of varieties) {
    if (grouping.has(variety.color)) {
      grouping.get(variety.color).push(variety);
    } else {
      grouping.set(variety.color, [variety]);
    }
  }

  return grouping;
}

export function groupByID(varieties) {
  const grouping = new Map();

  for (let variety of varieties) {
    grouping.set(variety.id, variety);
  }

  return grouping;
}

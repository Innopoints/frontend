import arraysEqual from '@/utils/arrays-equal.js';
import setNullSafe from '@/utils/set-null-safe.js';

/* Returns a map of colors to arrays of varieties. */
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

/* Returns a map of an ID to a variety. */
export function groupByID(varieties) {
  const grouping = new Map();

  for (let variety of varieties) {
    grouping.set(variety.id, variety);
  }

  return grouping;
}

/* Convert the backend varieties into human varieties. */
export function prepareAfterBackend(product) {
  const varietiesByColor = groupByColor(product.varieties);

  product.sized = product.varieties[0].size != null;
  product.varieties = [];
  for (let color of varietiesByColor.keys()) {
    let varieties = varietiesByColor.get(color);
    let thisColorVariety = Object.assign({}, varieties[0]);

    if (product.sized) {
      thisColorVariety.sizes = {};
      for (let variety of varieties) {
        thisColorVariety.sizes[variety.size] = variety.amount;
      }
      thisColorVariety.quantity = 0;
    } else {
      thisColorVariety.quantity = thisColorVariety.amount;
      thisColorVariety.sizes = {};
    }

    delete thisColorVariety.size;
    delete thisColorVariety.amount;
    delete thisColorVariety.purchases;
    product.varieties.push(thisColorVariety);
  }

  return product;
}

/* Compute differences between two products in four categories:
   - modified fields
   - new varieties
   - modified varieties
   - deleted varieties */
export function computeDiffs(product, reference) {
  reference = copyProduct(reference);
  const diffs = {
    fields: null,
    newVarieties: [],
    modifiedVarieties: [],
    deletedVarieties: null,
  };

  for (let field of ['name', 'type', 'description', 'price']) {
    if (product[field] !== reference[field]) {
      diffs.fields = setNullSafe(diffs.fields, field, product[field]);
    }
  }

  for (let variety of product.varieties) {
    const corresponding = reference.varieties.findIndex(
      candidate => candidate.color == variety.color && candidate.size == variety.size,
    );

    if (corresponding === -1) {
      diffs.newVarieties.push(variety);
    } else {
      if (!arraysEqual(variety.images, reference.varieties[corresponding].images)
          || variety.amount !== reference.varieties[corresponding].amount) {
        variety.id = reference.varieties[corresponding].id;
        diffs.modifiedVarieties.push(variety);
      }
      reference.varieties.splice(corresponding, 1);
    }
  }
  diffs.deletedVarieties = reference.varieties;

  return diffs;
}

/* Copy a product object, deep-copying nested fields. */
export function copyProduct(product) {
  const copy = Object.assign({}, product);

  copy.varieties = product.varieties.map(variety => {
    const varietyCopy = Object.assign({}, variety);
    varietyCopy.images = variety.images.slice();
    return varietyCopy;
  });

  return copy;
}

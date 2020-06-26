export function getBlankVariety() {
  return {
    sizes: {},
    quantity: 0,
    images: [],
  };
}

export function getBlankProduct() {
  return { varieties: [ getBlankVariety() ], sized: true };
}

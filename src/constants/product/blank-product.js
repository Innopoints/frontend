export function getBlankVariety() {
  return {
    sizes: {},
    images: [],
  };
}

export function getBlankProduct() {
  return { varieties: [ getBlankVariety() ], sized: true };
}

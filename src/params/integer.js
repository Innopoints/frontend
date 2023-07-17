/** @type {import('@sveltejs/kit').ParamMatcher} */
export const match = (param) => {
  return /^\d+$/.test(param);
};

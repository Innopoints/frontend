import getInitialData from "src/utils/get-initial-data.js";
const productLimit = 3;

export async function load() {
  const data = await getInitialData(
    this,
    session,
    new Map([
      [
        "products",
        {
          url: `/products?limit=${productLimit}`,
          transform: (resp) => resp.data,
        },
      ],
    ])
  );

  data.account = session.account;
  return data;
}

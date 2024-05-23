export const fetchItems = async (order = "recent", page = 1, pageSize = 10) => {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?page=${page}&orderBy=${order}&pageSize=${pageSize}`
  );
  const result = await response.json();
  return result;
};

export const fetchTopFourBestItems = async () => {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?orderBy=favorite`
  );
  const result = await response.json();
  return result.list.slice(0, 4);
};

export const fetchDetailItem = async (productId) => {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}`
  );
  const result = await response.json();
  return result;
};

export const fetchComments = async (productId) => {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}/comments?limit=5`
  );
  const result = await response.json();
  return result;
};

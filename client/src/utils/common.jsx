export const formatPriceVN = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const formatDateTime = (datetime) => {
  const date = new Date(datetime);

  const result = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  return result;
};

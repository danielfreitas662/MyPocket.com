export const objectToQueryString = (data: Record<string, any>) => {
  const length = Object.keys(data).filter((c) => data[c]).length - 1;
  const query = Object.keys(data)
    .filter((c) => data[c])
    .reduce((a, b, index) => a + `${b}=${data[b]}${index < length ? '&' : ''}`, '');
  return query;
};

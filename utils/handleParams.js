export const handlePageParams = (params) => {
  let newParams = {
    page: 0,
    length: 10,
    ...params,
  };

  (newParams.page = params.page + 1), (newParams.length = params.length);

  return newParams;
};

const queryParserHelper = (obj, query) => {
  let params = {...obj};
  for (let p in query) {
    if (p in params) {
      params[p] = query[p];
    }
  }
  return params;
};

export { queryParserHelper };

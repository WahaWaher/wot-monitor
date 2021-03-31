const createRouteNamesObject = (routes) =>
  Object.keys(routes).reduce(
    (paths, key) => ({
      ...paths,
      [key]: routes[key].path,
    }),
    {}
  );

export default createRouteNamesObject;

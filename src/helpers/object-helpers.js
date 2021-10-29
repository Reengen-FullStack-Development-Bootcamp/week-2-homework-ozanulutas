// Returns the object property by given path
function getPropByPath(obj, path) {
  path = path.split(".");

  if(path.length > 1) {
    return getPropByPath(obj[path[0]], path.slice(1, path.length).join("."));
  }
  return obj[path[0]];
}

export { getPropByPath }
function buildParam(params) {
  let fD = new FormData();
  Object.keys(params).map(param => fD.append(param, params[param]));
  return fD;
}

export const ajax = (url, options = null) => {
  if (options && options.body) {
    options.body = buildParam(options.body);
  }

  return fetch(url, options).then(response => response.json());
}

export default ajax;

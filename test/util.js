
export const parseQueryString = (qs) => {
  if (qs.slice(0, 1) === '?') {
    qs = qs.substring(1);
  }
  const obj = {};
  qs.split('&').forEach(function (v) {
    const variable = v.split('=');
    obj[variable[0]] = variable.length === 2
      ? decodeURIComponent(variable[1])
      : null
      ;
  });
  return obj;
}

export const convertDataValues = (data) => {
  for (const key in data) {
    if (typeof data[key] === 'number') {
      data[key] = data[key].toString()
    } else if (typeof data[key] === 'string') {
      data[key] = data[key].replace(/(?<!\\)(?<!\r)\n/g, '\r\n')
    }
  }
  return data
}

const genCssSizes = (input) => {
  if (typeof input === 'number') {
    return `${input}px`.trim();
  } else if (typeof input === 'string') {
    return input.trim();
  } else if (Array.isArray(input)) {
    let str = '';

    input.map((value) => {
      str =
        typeof value === 'number'
          ? `${str} ${value}px `
          : typeof value === 'string'
          ? `${str} ${value} `
          : '';

      return str;
    });

    return str.replace(/\s{2,}/g, ' ').trim();
  } else return '';
};
export default genCssSizes;

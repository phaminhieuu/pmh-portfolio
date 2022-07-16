export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const checkPath = (href, path) => {
  const convert = href.replace("/", "");

  return path.includes(convert);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findDeepValue = (object: any, path: string) => {
  const paths = path.split(".");
  let obj = object;

  for (let i = 0; i < paths.length; i++) {
    if (!obj[paths[i]]) {
      return;
    } else {
      obj = obj[paths[i]];
    }
  }
  return obj;
};

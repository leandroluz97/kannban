export const getLastPosition = (array: any) => {
  //
  return array.reduce((acc: any, item: any) => {
    if (item.position > acc) acc = item.position;
    return acc;
  }, 0);
};

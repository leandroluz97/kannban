export const getLeftToRightDirection =
  (source: number, destination: number) =>
  (position: number) => {
    return position >= source && position <= destination;
  };

export const getRightToLeftDirection =
  (source: number, destination: number) =>
  (position: number) => {
    return position <= source && position >= destination;
  };

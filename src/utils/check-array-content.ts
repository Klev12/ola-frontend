const checkArrayContent = (array: string[], target: string[]) => {
  return target.every((value) => array.includes(value));
};

export default checkArrayContent;

const isExpireTime = (expireDate: string) => {
  const expireTime = new Date(expireDate).getTime();
  const currentTime = Date.now();

  return currentTime > expireTime;
};

export default isExpireTime;

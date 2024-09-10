import { useState } from "react";

interface UseDebounceProps<T> {
  fn: (param: T) => void;
  time: number;
}

const useDebounce = <T>({ fn, time }: UseDebounceProps<T>) => {
  const [key, setKey] = useState<number | undefined>(undefined);

  const debounce: typeof fn = (param) => {
    if (key) {
      clearTimeout(key);
    }

    const newKey = setTimeout(() => {
      fn(param);
    }, time);

    setKey(Number(newKey));
  };

  return { debounce };
};

export default useDebounce;

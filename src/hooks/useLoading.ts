import { useState } from "react";

const useLoading = (initialValue: boolean = false) => {
  const [loading, setLoading] = useState(initialValue);

  const setLoadingTrue = () => {
    setLoading(true);
  };

  const setLoadingFalse = () => {
    setLoading(false);
  };

  return {
    loading,
    setLoadingTrue,
    setLoadingFalse,
  };
};

export default useLoading;

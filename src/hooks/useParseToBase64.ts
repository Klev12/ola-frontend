import { useEffect, useState } from "react";

const useParseToBase64 = (imgUrl: string) => {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    const convertImageToBase64 = async () => {
      if (!imgUrl) return;
      try {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    };

    convertImageToBase64();
  }, [imgUrl]);

  return { base64 };
};

export default useParseToBase64;

import { Image } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const CardImages = () => {
  const { cardBackLink, cardFrontLink } = useContext(FormPdfContext);

  return (
    <>
      {cardBackLink !== "" && (
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: cardBackLink,
            method: "GET",
            headers: {},
            body: "",
          }}
        ></Image>
      )}
      {cardFrontLink !== "" && (
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: cardFrontLink,
            method: "GET",
            headers: {},
            body: "",
          }}
        ></Image>
      )}
    </>
  );
};

export default CardImages;

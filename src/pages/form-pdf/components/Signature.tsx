import { Image, Text } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const Signature = () => {
  const { signatureLink, lastNames, names } = useContext(FormPdfContext);

  return (
    <>
      <Text>{`Yo ${names} ${lastNames} estoy de acuerdo con los términos y condiciones.`}</Text>
      {signatureLink !== "" && (
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: signatureLink,
            method: "GET",
            headers: {},
            body: "",
          }}
        ></Image>
      )}
    </>
  );
};

export default Signature;

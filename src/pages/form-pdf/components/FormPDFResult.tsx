import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Result } from "../../../models/result";
import { ReactNode, useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const styles = StyleSheet.create({
  result: {
    display: "flex",
    justifyContent: "center",
    fontSize: "12px",
    fontFamily: "InterFamily",
    marginTop: "20px",
  },
});

interface FormPDFResultProps {
  result: Result;
}

const FormPDFResult = ({ result }: FormPDFResultProps) => {
  const { lastNames, names, signatureLink } = useContext(FormPdfContext);

  const hashTable: { [key: string]: () => ReactNode } = {
    ["true"]: () => <Text style={styles.result}>Sí</Text>,
    ["false"]: () => <Text style={styles.result}>No</Text>,
    ["on"]: () => (
      <View>
        <Text style={styles.result}>
          Yo {names} {lastNames} estoy de acuerdo con los terminos y
          condiciones.
        </Text>
        <View>
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
        </View>
      </View>
    ),
    ["default"]: () => (
      <Text style={styles.result}>{result.response.value}.</Text>
    ),
  };

  return (
    <View>
      {hashTable[result.response.value]
        ? hashTable[result.response.value]()
        : hashTable["default"]()}
    </View>
  );
};

export default FormPDFResult;

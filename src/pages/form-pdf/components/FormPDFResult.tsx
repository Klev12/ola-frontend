import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Result } from "../../../models/result";
import { ReactNode } from "react";
import Signature from "./Signature";

const styles = StyleSheet.create({
  result: {
    margin: 12,
    textAlign: "justify",
    fontSize: "12px",
    fontFamily: "RobotoLightFamily",
  },
});

interface FormPDFResultProps {
  result: Result;
}

const FormPDFResult = ({ result }: FormPDFResultProps) => {
  const hashTable: { [key: string]: () => ReactNode } = {
    ["true"]: () => <Text style={styles.result}>Sí</Text>,
    ["false"]: () => <Text style={styles.result}>No</Text>,
    ["on"]: () => (
      <View>
        <View>
          <Signature />
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

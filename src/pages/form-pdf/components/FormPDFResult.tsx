import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Result } from "../../../models/result";
import { ReactNode } from "react";
import Signature from "./Signature";
import ThirdCustom from "../fonts/Roboto-Light.ttf";

Font.register({
  family: "RobotoLightFamily",
  src: ThirdCustom,
});

const styles = StyleSheet.create({
  result: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    textAlign: "justify",
    fontSize: "18px",
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
    ["single"]: () => {
      return <Text style={styles.result}>Soltero</Text>;
    },
    ["default"]: () => (
      <Text style={styles.result}>{result.response.value}.</Text>
    ),
  };

  return (
    <View>
      {hashTable?.[result.response.value]
        ? hashTable[result.response.value]()
        : hashTable["default"]()}
    </View>
  );
};

export default FormPDFResult;

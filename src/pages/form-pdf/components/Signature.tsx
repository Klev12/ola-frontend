import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const styles = StyleSheet.create({
  signatureContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  signatureText: {
    marginBottom: 10,
  },
  signatureImage: {
    width: 150,
  },
});

const Signature = () => {
  const { signatureLink, lastNames, names } = useContext(FormPdfContext);

  return (
    <View style={styles.signatureContainer}>
      <Text style={styles.signatureText}>
        {`Yo ${names} ${lastNames} estoy de acuerdo con los términos y condiciones.`}
      </Text>
      {signatureLink !== "" && (
        <Image
          style={styles.signatureImage}
          source={{
            uri: signatureLink,
            method: "GET",
            headers: {},
            body: "",
          }}
        />
      )}
    </View>
  );
};

export default Signature;

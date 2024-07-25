import { Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Signature from "./Signature";
import { ContractGetDto } from "../../../models/contract";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import FontRobotoLight from "../fonts/Roboto-Light.ttf";
import { Header } from "./Header";

Font.register({
  family: "RobotoLightFamily",
  src: FontRobotoLight,
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  firstTitle: {
    padding: "20px",
    marginLeft: "50px",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  text: {
    fontFamily: "RobotoLightFamily",
    fontSize: "20px",
  },
});

interface FormPDFContractProps {
  contract?: ContractGetDto;
}

const FormPDFContract = ({ contract }: FormPDFContractProps) => {
  const { names, lastNames } = useContext(FormPdfContext);

  return (
    <Page size="A4" style={styles.page}>
      <View>
        <Header />
      </View>
      <Text style={styles.firstTitle}>{contract?.title}</Text>

      <Text style={styles.text}>
        {`Yo ${names} ${lastNames} estoy de acuerdo con el siguiente contrato: `}
        {contract?.description}
      </Text>
      <Signature />

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

export default FormPDFContract;

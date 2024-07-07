import { Page, StyleSheet, Text } from "@react-pdf/renderer";
import Signature from "./Signature";
import { ContractGetDto } from "../../../models/contract";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  formGroup: {
    gap: "10px",
    fontSize: "19px",
  },
  firstTitle: {
    padding: "20px",
    marginLeft: "50px",
  },
  title: {
    fontWeight: "black",
    fontSize: "25px",
    fontFamily: "PlayfairDisplayFamily",
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
});

interface FormPDFContractProps {
  contract?: ContractGetDto;
}

const FormPDFContract = ({ contract }: FormPDFContractProps) => {
  const { names, lastNames } = useContext(FormPdfContext);

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.firstTitle}>{contract?.title}</Text>

      <Text>
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

import { Page, StyleSheet, Text } from "@react-pdf/renderer";
import { ContractGetDto } from "../../../models/contract";
import React, { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import Signature from "./Signature";
import CardImages from "./CardImages";

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

interface FormPDFContractsProps {
  termsAndConditions?: ContractGetDto;
}

const FormPDFContracts = ({ termsAndConditions }: FormPDFContractsProps) => {
  const { names, lastNames } = useContext(FormPdfContext);

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.firstTitle}>Contrato</Text>

      <React.Fragment key={termsAndConditions?.id}>
        <Text>
          {`Yo ${names} ${lastNames} estoy de acuerdo con los terminos y condiciones`}
          {termsAndConditions?.description}
        </Text>
        <Signature />
      </React.Fragment>
      {termsAndConditions?.id == 2 && <CardImages />}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

export default FormPDFContracts;

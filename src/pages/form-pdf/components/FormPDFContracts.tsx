import { Page, StyleSheet, Text } from "@react-pdf/renderer";
import { useQuery } from "react-query";
import { getTermsAndConditions } from "../../../services/contract-service";
import { ContractGetDto } from "../../../models/contract";
import React, { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import Signature from "./Signature";
import CardImages from "./CardImages";

const styles = StyleSheet.create({
  page: {
    paddingLeft: "20px",
    paddingTop: "40px",
    paddingBottom: "50px",
    paddingRight: "50px",
    gap: "20px",
    marginLeft: "45px",
    marginRight: "200px",
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
    </Page>
  );
};

export default FormPDFContracts;

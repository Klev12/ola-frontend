import { Page, StyleSheet, Text } from "@react-pdf/renderer";
import Signature from "./Signature";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
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

interface FormPDFTermAndConditionsProps {
  termAndConditions?: TermAndConditionsGetDto;
  hasImages?: boolean;
}

const FormPDFTermAndConditions = ({
  termAndConditions,
  hasImages = true,
}: FormPDFTermAndConditionsProps) => {
  const { names, lastNames } = useContext(FormPdfContext);

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.firstTitle}>Términos y condiciones</Text>

      <Text>
        {`Yo ${names} ${lastNames} estoy de acuerdo con los siguientes términos y condiciones: `}
        {termAndConditions?.description}
      </Text>
      <Signature />
      {hasImages && <CardImages />}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

export default FormPDFTermAndConditions;

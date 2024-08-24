import { Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Signature from "./Signature";
import { TermAndConditionsGetDto } from "../../../models/term-and-conditions";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import CardImages from "./CardImages";
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
      <View>
        <Header />
      </View>
      <Text style={styles.firstTitle}>Términos y condiciones</Text>
      <Text style={styles.text}>
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

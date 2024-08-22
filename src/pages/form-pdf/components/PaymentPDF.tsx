import { Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import TransactionsPDF from "./TransactionsPDF";
import Roboto from "../fonts/Roboto-Light.ttf";
import RobotoBold from "../fonts/Roboto-Bold.ttf";
import RobotoMedium from "../fonts/Roboto-MediumItalic.ttf";
import { Header } from "./Header";

Font.register({
  family: "RobotoLightFamily",
  src: Roboto,
});

Font.register({
  family: "RobotoBoldFamily",
  src: RobotoBold,
});

Font.register({
  family: "RobotoMediumFamily",
  src: RobotoMedium,
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 35,
    paddingHorizontal: 35,
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
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "purple",
    fontFamily: "RobotoLightFamily",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingTop: 30,
  },
  label: {
    fontSize: 20,
    fontFamily: "RobotoMediumFamily",
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  resultItem: {
    fontSize: 12,
    marginLeft: 5,
  },
  title: {
    fontFamily: "RobotoBoldFamily",
    fontSize: 25,
  },
});

const PaymentPDF = () => {
  const { payment } = useContext(FormPdfContext);

  return (
    <Page size={"A4"} style={styles.page}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Factura</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text>{payment?.total}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Valor pagado:</Text>
          <Text>{payment?.subscription_value}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Número de cuotas:</Text>
          <Text>{payment?.number_fees}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Valor mensual:</Text>
          <Text>{payment?.month_value}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Valor restante:</Text>
          <Text>{payment?.remaining_total}</Text>
        </View>
      </View>

      <TransactionsPDF />
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

export default PaymentPDF;

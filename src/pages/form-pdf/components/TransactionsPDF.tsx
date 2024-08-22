import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import Roboto from "../fonts/Roboto-Light.ttf";
import RobotoMedium from "../fonts/Roboto-MediumItalic.ttf";

const TransactionsPDF = () => {
  const { transactions } = useContext(FormPdfContext);

  Font.register({
    family: "RobotoLightFamily",
    src: Roboto,
  });

  Font.register({
    family: "RobotoMediumFamily",
    src: RobotoMedium,
  });

  const styles = StyleSheet.create({
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
  });

  return (
    <View>
      {transactions?.map((transaction) => {
        return (
          <View key={transaction.id} style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Valor pagado:</Text>
              <Text> {transaction.amount}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Id del cliente:</Text>
              <Text>{transaction.clientTransactionId}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Estatus code: </Text>
              <Text>{transaction.statusCode}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Creado en: </Text>
              <Text>{String(transaction.createdAt)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TransactionsPDF;

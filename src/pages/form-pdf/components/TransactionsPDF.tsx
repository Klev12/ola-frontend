import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const TransactionsPDF = () => {
  const { transactions } = useContext(FormPdfContext);

  return (
    <View>
      {transactions?.map((transaction) => {
        return (
          <View key={transaction.id}>
            <Text>Valor pagado: {transaction.amount}</Text>
            <Text>Id del cliente: {transaction.clientTransactionId}</Text>
            <Text>Estatus code: {transaction.statusCode}</Text>
            <Text>Creado en: {String(transaction.createdAt)}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default TransactionsPDF;

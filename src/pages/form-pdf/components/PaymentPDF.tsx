import { Page, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";
import TransactionsPDF from "./TransactionsPDF";

const PaymentPDF = () => {
  const { payment } = useContext(FormPdfContext);

  return (
    <Page>
      <View>
        <Text>Total: {payment?.total}</Text>
        <Text>Valor pagado: {payment?.subscription_value}</Text>
        <Text>Número de cuotas: {payment?.number_fees}</Text>
        <Text>Valor mensual: {payment?.month_value}</Text>
        <Text>Valor restante: {payment?.remaining_total}</Text>
      </View>

      <TransactionsPDF />
    </Page>
  );
};

export default PaymentPDF;

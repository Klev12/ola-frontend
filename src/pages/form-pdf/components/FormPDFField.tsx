import { Text, View } from "@react-pdf/renderer";
import { Field } from "../../../models/form-scheme";
import FormPDFResult from "./FormPDFResult";

interface FormPDFFieldProps {
  field: Field;
}

const FormPDFField = ({ field }: FormPDFFieldProps) => {
  return (
    <View>
      <Text>{field.label}:</Text>
      <Text>{field.results?.[0]?.response?.value}</Text>
    </View>
  );
};

export default FormPDFField;

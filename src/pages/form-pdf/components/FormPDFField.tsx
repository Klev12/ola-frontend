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
      {field.results.map((result, index) => {
        return <FormPDFResult key={index} result={result} />;
      })}
    </View>
  );
};

export default FormPDFField;

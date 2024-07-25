import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Field } from "../../../models/form-scheme";
import FormPDFResult from "./FormPDFResult";

interface FormPDFFieldProps {
  field: Field;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "purple",
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

const FormPDFField = ({ field }: FormPDFFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{field.label}:</Text>
        <View style={styles.resultsContainer}>
          {field.results.map((result, index) => (
            <Text key={index} style={styles.resultItem}>
              <FormPDFResult result={result} />
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FormPDFField;

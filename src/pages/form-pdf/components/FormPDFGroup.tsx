import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { FormGroup } from "../../../models/form-scheme";
import FormPDFField from "./FormPDFField";

const styles = StyleSheet.create({
  formGroup: {
    gap: "10px",
    fontSize: "50px",
  },
  firstTitle: {
    padding: "20px",
    marginLeft: "50px",
  },
  title: {
    fontWeight: "black",
    fontSize: "35px",
    fontFamily: "PlayfairDisplayFamily",
  },
  result: {
    display: "flex",
    justifyContent: "center",
    fontSize: "12px",
    fontFamily: "InterFamily",
    marginTop: "20px",
  },
});

interface FormPDFGroupProps {
  formGroup: FormGroup;
}

const FormPDFGroup = ({ formGroup }: FormPDFGroupProps) => {
  return (
    <View style={styles.formGroup}>
      {formGroup.fields?.[0]?.metadata?.type == "boolean" ? (
        <>
          <Text style={styles.title}>· {formGroup.label}</Text>
          <FormPDFField field={formGroup.fields[0]} />
          {formGroup.fields?.[0]?.results?.[0]?.response?.value == "true" &&
            formGroup?.fields
              .filter((field) => field.id !== formGroup.fields[0].id)
              .map((field) => {
                return <FormPDFField key={field.id} field={field} />;
              })}
        </>
      ) : (
        <>
          <Text style={styles.title}>· {formGroup.label}</Text>
          {formGroup?.fields.map((field) => {
            return <FormPDFField key={field.id} field={field} />;
          })}
        </>
      )}
    </View>
  );
};

export default FormPDFGroup;

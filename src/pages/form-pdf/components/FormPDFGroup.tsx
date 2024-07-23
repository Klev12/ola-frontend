import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { FormGroup } from "../../../models/form-scheme";
import FormPDFField from "./FormPDFField";

const styles = StyleSheet.create({
  formGroup: {
    marginTop: "5px",
    gap: "10px",
    fontSize: "22px",
  },
  title: {
    fontWeight: "black",
    fontSize: "20px",
    fontFamily: "RobotoBoldFamily",
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

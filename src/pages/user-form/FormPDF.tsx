import {
  PDFViewer,
  Document,
  View,
  Text,
  Page,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { useQuery } from "react-query";
import { getUserForm } from "../../services/forms-service";

const styles = StyleSheet.create({
  page: {
    padding: "30px",

    gap: "20px",
  },
  formGroup: {
    gap: "10px",
  },
  title: {
    fontWeight: "light",
    fontSize: "20px",
  },
  result: {
    fontSize: "15px",
  },
});

const FormPDF = () => {
  const { data: userFormData } = useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
    queryKey: ["user-form"],
  });

  return (
    <PDFViewer style={{ width: "100vw", height: "500px" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {userFormData?.form_scheme.form_groups.map((formGroup) => {
            return (
              <View key={formGroup.id} style={styles.formGroup}>
                <Text style={styles.title}>* {formGroup.label}</Text>
                {formGroup?.fields.map((field) => {
                  return (
                    <View key={field.id}>
                      <Text>{field.label}</Text>
                      {field?.results.map((result) => {
                        return (
                          <View key={result.id}>
                            <Text style={styles.result}>
                              {result.response.value}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FormPDF;

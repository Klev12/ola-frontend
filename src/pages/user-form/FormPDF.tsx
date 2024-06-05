import {
  PDFViewer,
  Document,
  View,
  Text,
  Page,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useQuery } from "react-query";
import { getUserForm } from "../../services/forms-service";
import MyCustomFont from "../user-form/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import SecondFont from "../user-form/fonts/Inter-VariableFont_slnt,wght.ttf";

Font.register({
  family: "PlayfairDisplayFamily",
  src: MyCustomFont,
  fontStyle: "normal",
});
Font.register({
  family: "InterFamily",
  src: SecondFont,
});
const styles = StyleSheet.create({
  page: {
    paddingLeft: "20px",
    paddingTop: "40px",
    paddingBottom: "50px",
    paddingRight: "50px",
    gap: "20px",
    marginLeft: "45px",
    marginRight: "200px",
  },
  formGroup: {
    gap: "10px",
    fontSize: "19px",
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

const FormPDF = () => {
  const { data: userFormData } = useQuery({
    queryFn: () => getUserForm().then((res) => res.data),
    queryKey: ["user-form"],
  });

  return (
    <PDFViewer
      style={{
        width: "100vw",
        height: "770px",
      }}
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.firstTitle}>
            {" "}
            FORMUALRIO DE INGRESO DE PERSONAL
          </Text>
          {userFormData?.form_scheme.form_groups.map((formGroup) => {
            return (
              <View key={formGroup.id} style={styles.formGroup}>
                <Text style={styles.title}>· {formGroup.label}</Text>
                {formGroup?.fields.map((field) => {
                  return (
                    <View key={field.id}>
                      <Text>{field.label}:</Text>
                      {field?.results.map((result) => {
                        return (
                          <View key={result.id}>
                            <Text style={styles.result}>
                              {result.response.value}.
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

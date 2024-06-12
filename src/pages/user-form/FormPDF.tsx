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

    marginRight: "200px",
  },
  formGroup: {
    gap: "10px",
    fontSize: "19px",
    marginLeft: 50,
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
    margin: 12,
    textAlign: "justify",
    fontSize: 14,
    fontFamily: "InterFamily",
    marginLeft: 200,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
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
            FORMUALRIO DE INGRESO DE PERSONAL
          </Text>
          <View style={styles.formGroup} wrap>
            {userFormData?.form_scheme.form_groups.map((formGroup) => (
              <View key={formGroup.id} wrap={false}>
                <Text style={styles.title}>· {formGroup.label}</Text>
                {formGroup?.fields.map((field) => (
                  <View key={field.id} wrap={false}>
                    <Text>{field.label}:</Text>
                    {field?.results.map((result) => (
                      <View key={result.id} wrap={false}>
                        <Text style={styles.result}>
                          {result.response.value}.
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FormPDF;

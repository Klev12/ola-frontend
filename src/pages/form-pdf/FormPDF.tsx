import {
  PDFViewer,
  Document,
  Text,
  Page,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
import { useMutation, useQuery } from "react-query";
import { getUserFormByUserId } from "../../services/forms-service";
import MyCustomFont from "../user-form/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import SecondFont from "../user-form/fonts/Inter-VariableFont_slnt,wght.ttf";
import { useParams } from "react-router";
import FormPDFGroup from "./components/FormPDFGroup";
import useGlobalState from "../../store/store";
import { findUserById } from "../../services/user-service";
import FormPDFProvider from "./components/FormPDFContext";
import { useState } from "react";
import { MultimediaType } from "../../models/user";
import { ENV } from "../../consts/const";

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
    fontSize: "25px",
    fontFamily: "PlayfairDisplayFamily",
  },
});

const FormPDF = () => {
  const { id } = useParams();

  const [signatureLink, setSignaturelink] = useState("");

  const setUserFormNames = useGlobalState((state) => state.setUserFormNames);
  const setUserFormLastNames = useGlobalState(
    (state) => state.setUserFormLastNames
  );

  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);

  const { mutate: findUserByIdMutate } = useMutation(findUserById, {
    onSuccess: (userData) => {
      const signatureHash = userData.data.user.multimedias.find(
        (file) => file.type === MultimediaType.signature
      )?.hash;
      setSignaturelink(`${ENV.BACKEND_ROUTE}/multimedia/${signatureHash}`);
    },
  });

  const { data: userFormData } = useQuery({
    queryFn: () => getUserFormByUserId(id as string).then((res) => res.data),
    queryKey: ["user-form"],
    onSuccess: (userForm) => {
      const userFormData = userForm.form_scheme.form_groups.find(
        (formGroup) => formGroup.label === "Mis datos"
      );

      setUserFormNames(
        userFormData?.fields?.[0]?.results[0]?.response?.value as string
      );
      setUserFormLastNames(
        userFormData?.fields?.[1]?.results[0]?.response?.value as string
      );

      findUserByIdMutate(userForm.user_form.user_id);
    },
  });

  return (
    <PDFViewer
      style={{
        width: "100vw",
        height: "770px",
      }}
    >
      <Document>
        <FormPDFProvider
          lastNames={userFormLastNames as string}
          names={userFormNames as string}
          signatureLink={signatureLink}
        >
          <Page size="A4" style={styles.page}>
            <Text style={styles.firstTitle}>
              FORMULARIO DE INGRESO DE PERSONAL
            </Text>
            {userFormData?.form_scheme.form_groups.map((formGroup) => {
              return (
                <View key={formGroup.id} wrap={false}>
                  <FormPDFGroup formGroup={formGroup} />
                </View>
              );
            })}
          </Page>
        </FormPDFProvider>
      </Document>
    </PDFViewer>
  );
};

export default FormPDF;

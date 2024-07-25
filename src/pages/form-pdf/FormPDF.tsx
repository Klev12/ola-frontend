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
import MyCustomFont from "../form-pdf/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import SecondFont from "../form-pdf/fonts/Inter-VariableFont_slnt,wght.ttf";
import { useParams } from "react-router";
import FormPDFGroup from "./components/FormPDFGroup";
import useGlobalState from "../../store/store";
import { findUserById } from "../../services/user-service";
import FormPDFProvider from "./components/FormPDFContext";
import { useState } from "react";
import { MultimediaType } from "../../models/user";
import { ENV } from "../../consts/const";
import ThirdCustom from "../form-pdf/fonts/Roboto-Bold.ttf";
import FontRobotoLight from "../form-pdf/fonts/Roboto-Light.ttf";
import FormPDFContract from "./components/FormPDFContract";
import FormPDFTermAndConditions from "./components/FormPDFTermAndConditions";
import { Header } from "./components/Header";

Font.register({
  family: "PlayfairDisplayFamily",
  src: MyCustomFont,
  fontStyle: "normal",
});
Font.register({
  family: "InterFamily",
  src: SecondFont,
});

Font.register({
  family: "RobotoBoldFamily",
  src: ThirdCustom,
});

Font.register({
  family: "RobotoLightFamily",
  src: FontRobotoLight,
});
const styles = StyleSheet.create({
  page: { paddingTop: 20, paddingBottom: 35, paddingHorizontal: 35 },
  firstTitle: {
    padding: "20px",
    marginLeft: "50px",
    fontFamily: "RobotoBoldFamily",
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
  const { id } = useParams();

  const [signatureLink, setSignaturelink] = useState("");
  const [cardFrontLink, setCardFrontLink] = useState("");
  const [cardBackLink, setCardBackLink] = useState("");

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
      const cardHashes = userData.data.user.multimedias.filter(
        (file) => file.type == MultimediaType.cardId
      );
      setSignaturelink(`${ENV.BACKEND_ROUTE}/multimedia/${signatureHash}`);
      setCardFrontLink(`${ENV.BACKEND_ROUTE}/multimedia/${cardHashes[0].hash}`);
      setCardBackLink(`${ENV.BACKEND_ROUTE}/multimedia/${cardHashes[1].hash}`);
    },
  });

  const { data: userFormData } = useQuery({
    queryFn: () => getUserFormByUserId(id as string).then((res) => res.data),
    queryKey: ["user-form"],
    retry: 1,
    refetchOnWindowFocus: false,
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
          cardBackLink={cardBackLink}
          cardFrontLink={cardFrontLink}
        >
          <Page size="A4" style={styles.page}>
            <View fixed>
              <Header />
            </View>

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
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
          <FormPDFContract contract={userFormData?.user_form?.contract} />
          <FormPDFTermAndConditions
            termAndConditions={userFormData?.user_form?.term_and_condition}
          />
        </FormPDFProvider>
      </Document>
    </PDFViewer>
  );
};

export default FormPDF;

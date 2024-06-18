import { useMutation, useQuery } from "react-query";
import { getFormById, getUserFormByUserId } from "../../services/forms-service";
import { ENV } from "../../consts/const";
import { findUserById } from "../../services/user-service";
import { getTermsAndConditions } from "../../services/contract-service";
import useGlobalState from "../../store/store";
import { useParams } from "react-router";
import { useState } from "react";
import { MultimediaType } from "../../models/user";
import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import FormPDFProvider from "./components/FormPDFContext";
import MyCustomFont from "../form-pdf/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import SecondFont from "../form-pdf/fonts/Inter-VariableFont_slnt,wght.ttf";
import ThirdCustom from "../form-pdf/fonts/Roboto-Bold.ttf";
import FontRobotoLight from "../form-pdf/fonts/Roboto-Light.ttf";
import FormPDFGroup from "./components/FormPDFGroup";
import FormPDFContracts from "./components/FormPDFContracts";
import { ContractGetDto } from "../../models/contract";

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
  page: { paddingTop: 35, paddingBottom: 65, paddingHorizontal: 35 },
  firstTitle: {
    padding: "20px",
    marginLeft: "50px",
    fontFamily: "RobotoBoldFamily",
  },
  title: {
    fontWeight: "black",
    fontSize: "25px",
    fontFamily: "RobotoBoldFamily ",
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

const SalesFormPDF = () => {
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

  const { data: termsAndConditions } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getTermsAndConditions,
  });

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
    queryFn: () => getFormById(id as string).then((res) => res.data),
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

      findUserByIdMutate(userForm.form.user_id);
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
            <Text style={styles.firstTitle}>FORMULARIO DE VENTAS</Text>
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
          <FormPDFContracts
            termsAndConditions={termsAndConditions?.[0] as ContractGetDto}
          />
          <FormPDFContracts
            termsAndConditions={termsAndConditions?.[1] as ContractGetDto}
          />
        </FormPDFProvider>
      </Document>
    </PDFViewer>
  );
};

export default SalesFormPDF;

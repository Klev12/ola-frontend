import { Image, View, StyleSheet } from "@react-pdf/renderer";
import { useContext } from "react";
import { FormPdfContext } from "./FormPDFContext";

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
  },
});

const CardImages = () => {
  const { cardBackLink, cardFrontLink } = useContext(FormPdfContext);

  return (
    <View style={styles.imageContainer}>
      {cardBackLink !== "" && (
        <Image
          style={styles.image}
          source={{
            uri: cardBackLink,
            method: "GET",
            headers: {},
            body: "",
          }}
        />
      )}
      {cardFrontLink !== "" && (
        <Image
          style={styles.image}
          source={{
            uri: cardFrontLink,
            method: "GET",
            headers: {},
            body: "",
          }}
        />
      )}
    </View>
  );
};

export default CardImages;

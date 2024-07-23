import { StyleSheet, View, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontSize: 12,
  },
  logo: {
    width: 100,
    height: "auto",
  },
});

export const Header = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        src={
          "https://blog.hubspot.es/hs-fs/hubfs/ES%20Blog%20images/Los%2015%20logos%20m%C3%A1s%20creativos%20e%20inspiradores%20del%20mundo/logo_famoso_starbucks.jpg?width=650&name=logo_famoso_starbucks.jpg"
        }
      />
    </View>
  );
};

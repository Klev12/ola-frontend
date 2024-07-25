import { StyleSheet, View, Image } from "@react-pdf/renderer";
import logo from "../../../assets/logo.jpeg";

const styles = StyleSheet.create({
  logo: {
    position: "relative",
    top: 0,
    right: 0,
    width: 100,
    height: "auto",
  },
});

export const Header = () => {
  return (
    <View>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

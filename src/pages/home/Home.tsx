import "./styles/home-styles.css";
import MyTime from "../../components/Timer";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Home</h2>
      <MyTime />
    </div>
  );
};

export default Home;

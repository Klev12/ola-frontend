import "./styles/global-loading-styles.css";

const GlobalLoading = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="global-loading-overlay"
      >
        <h2>OLA</h2>
      </div>
    </div>
  );
};

export default GlobalLoading;

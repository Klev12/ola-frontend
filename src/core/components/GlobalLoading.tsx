import "./styles/global-loading-styles.css";

interface GlobalLoadingProps {
  message?: string;
}

const GlobalLoading = ({ message = "OLA!" }: GlobalLoadingProps) => {
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
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default GlobalLoading;

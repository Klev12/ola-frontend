import RegulationForm from "./components/Dialog";

const Regulation = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "10px",
      }}
    >
      Reglamento
      <RegulationForm />
      <RegulationForm />
      <RegulationForm />
      <RegulationForm />
      <RegulationForm />
    </div>
  );
};

export default Regulation;

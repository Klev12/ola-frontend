import useGlobalState from "../store/store";

const ContractHeader = () => {
  const userFormNames = useGlobalState((state) => state.userFormNames);
  const userFormLastNames = useGlobalState((state) => state.userFormLastNames);
  const userIdCard = useGlobalState((state) => state.userIdCard);

  return (
    <div style={{ marginBottom: "20px" }}>
      {" "}
      COMPARECIENTES: Comparecen a la celebración del presente contrato por una
      parte OLABUSINESS SAS, CON RUC 0195142890001, con represéntate legal el
      Sr. Christian Guapisaca Cabrera por otra parte {userFormNames}{" "}
      {userFormLastNames} por sus propios derechos con RUC/CÉDULA {userIdCard}.
      en calidad de ‘‘BENEFICIARIO’’, siendo los comparecientes mayores de edad
      y en general capaces para celebrar todo acto y contrato ante la ley.
    </div>
  );
};

export default ContractHeader;

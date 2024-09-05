import { ReactNode } from "react";
import { FormDetails } from "../../models/forms";
import formatDateEs from "../../utils/format-date-es";

interface ConfidentialityContractStaticProps {
  formDetails?: FormDetails;
  children?: ReactNode;
}

const ConfidentialityContractStatic = ({
  formDetails,
  children,
}: ConfidentialityContractStaticProps) => {
  return (
    <div>
      <div>
        <div>
          <span style={{ fontWeight: "bold" }}>COMPARECIENTES.- </span>
          En la ciudad de Cuenca, el{" "}
          {formatDateEs(formDetails?.createdAt || "")}, intervienen en la
          celebración del presente contrato de confidencialidad, por una parte,
          la empresa OLABUSINESS SAS con RUC 0195142890001 quien en calidad de
          representante legal el Señor Christian Adrián Guapisaca Cabrera, por
          sus propios derechos y por los que representa; y por otra parte:{" "}
          {`${formDetails?.userNames} ${formDetails?.userLastNames}`}, con C.I.
          {formDetails?.cardId} por sus propios derechos, quienes
          voluntariamente se someten las siguientes cláusulas:
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>
            CLAUSULA PRIMERA. - ANTECEDENTES.-{" "}
          </span>
          Entre la empresa OLABUSINESS SAS debidamente representada por el Señor
          Christian Adrián Guapisaca Cabrera, y{" "}
          {`${formDetails?.userNames} ${formDetails?.userLastNames}`},
          celebraron un contrato de trabajo con periodo de prueba, el día{" "}
          {formatDateEs(formDetails?.createdAt || "")}, por lo tanto y a partir
          del presente a las partes se los denominara en el presente contrato de
          confidencialidad: OLABUSINESS SAS. como EMPLEADOR, y{" "}
          {`${formDetails?.userNames} ${formDetails?.userLastNames}`}, como EL
          TRABAJADOR, y con la finalidad de resguardar la confidencialidad de la
          información y conocimientos que EL EMPLEADOR imparta a EL TRABAJADOR,
          es indispensable se celebre el presente contrato de confidencialidad,
          el mismo que será detenidamente leído y explicado a las partes, las
          mismas que al estar de acuerdo en todas sus partes y renunciando a
          cualquier reclamo posterior, lo firman.
        </div>
        {children}
        <div>
          Para constancia y legalización de lo actuado, las partes suscriben en
          unidad de acto, el presente contrato en dos ejemplares de igual tenor
          y contenido en la ciudad de Cuenca, a los días{" "}
          {formatDateEs(formDetails?.createdAt || "")}.
        </div>
      </div>
    </div>
  );
};

export default ConfidentialityContractStatic;

import { ReactNode } from "react";
import { FormDetails } from "../../models/forms";
import formatDateEs from "../../utils/format-date-es";

interface SalesFormContractStatic {
  children?: ReactNode;
  formDetails?: FormDetails;
}

const SalesFormContractStatic = ({
  children,
  formDetails,
}: SalesFormContractStatic) => {
  return (
    <div>
      <div>
        <p>
          En la ciudad de Cuenca al día{" "}
          {formatDateEs(formDetails?.createdAt || "")}, comparecen, por una
          parte, el señor Christian Adrián Guapisaca Cabrera representante legal
          de OLABUSINESS SAS con numero de cedula RUC 0195142890001 en calidad
          de EMPLEADOR; y, por otra parte,
          {` ${formDetails?.userNames} ${formDetails?.userLastNames}`}, portador
          de la cédula de ciudadanía número {formDetails?.cardId} en calidad de
          TRABAJADOR. Los comparecientes son ecuatorianos, domiciliados en la
          ciudad de CUENCA y capaces para contratar, libre y expresado
          voluntariamente convienen en celebrar este Contrato Emergente con
          sujeción a las declaraciones y estipulaciones contenidas en las
          siguientes cláusulas:
        </p>
      </div>
      <div>
        <h2>PRIMERA: ANTECEDENTES:</h2>
        <p>
          EL EMPLEADOR para el cumplimiento de sus actividades y desarrollo de
          las tareas propias de su actividad necesita contratar los servicios
          laborales de {formDetails?.area}. Revisados los antecedentes de{" "}
          {`${formDetails?.userNames} ${formDetails?.userLastNames}`} declara
          tener los conocimientos necesarios para el desempeño del cargo
          indicado, por lo que en base a las consideraciones anteriores y por lo
          expresado en los numerales siguientes, EL EMPLEADOR y EL TRABAJADOR
          proceden a celebrar el presente Contrato de Trabajo.
        </p>
      </div>
      <div>
        <h2>SEGUNDA: OBJETO DEL CONTRATO:</h2>
        <p>
          EL TRABAJADOR se compromete con el empleador a prestar sus servicios
          lícitos y personales bajo la dependencia del EMPLEADOR en calidad de
          Secretaria con responsabilidad y esmero, que los desempeñará de
          conformidad con la Ley, las disposiciones generales, las órdenes e
          instrucciones que imparta EL EMPLEADOR, dedicando su mayor esfuerzo y
          capacidad en el desempeño de las actividades para las cuales ha sido
          contratado.
        </p>
      </div>
      {children}
      <div>
        <p>
          Para constancia y en ratificación de lo acordado, las partes se
          comprometen a reconocer firma y rúbrica ante un Inspector de Trabajo
          con jurisdicción en la ciudad de CUENCA, y suscriben el presente
          contrato en tres ejemplares del mismo tenor y efecto, en CUENCA, el{" "}
          {formatDateEs(formDetails?.createdAt || "")}.
        </p>
      </div>
    </div>
  );
};

export default SalesFormContractStatic;

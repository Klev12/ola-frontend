import { useQuery } from "react-query";
import { TestGetDto } from "../../../models/test";
import gradeService from "../../../services/grade-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ROUTES from "../../../consts/routes";
import { ProgressSpinner } from "primereact/progressspinner";
import { GradeGetDto, GradeStatus } from "../../../models/grade";
import { Tag } from "primereact/tag";
import PaginatorPage from "../../../components/PaginatorPage";
import { useState } from "react";

interface GradeListProps {
  test?: TestGetDto;
}

const GradeList = ({ test }: GradeListProps) => {
  const [page, setPage] = useState(1);

  const { data: gradesData, isLoading } = useQuery({
    queryFn: () =>
      gradeService
        .findAll({ testId: test?.id as number, page })
        .then((res) => res.data),
    queryKey: ["grades", test?.id, page],
  });

  return (
    <div>
      {isLoading && <ProgressSpinner />}
      {!isLoading && (
        <DataTable
          value={gradesData?.grades}
          emptyMessage="No hay resultados en esta prueba"
        >
          <Column header="Resuelto por" field="userName" />
          <Column header="Código de usuario" field="userCode" />
          <Column
            header="Estatus"
            body={(grade: GradeGetDto) => (
              <Tag
                severity={
                  grade.status === GradeStatus.resolved ? "success" : "info"
                }
                value={
                  grade.status === GradeStatus.resolved
                    ? "resuelto"
                    : "sin resolver"
                }
              />
            )}
          />
          <Column header="Nota" field="score" />
          <Column
            header="Pdf"
            body={(grade: GradeGetDto) => (
              <a
                target="_blank"
                href={`${ROUTES.PDF.TEST_ID(test?.id as number)}?userId=${
                  grade.userId
                }`}
              >
                ver pdf
              </a>
            )}
          />
        </DataTable>
      )}
      <PaginatorPage
        limit={10}
        total={gradesData?.count}
        onPage={(page) => {
          setPage(page + 1);
        }}
      />
    </div>
  );
};

export default GradeList;

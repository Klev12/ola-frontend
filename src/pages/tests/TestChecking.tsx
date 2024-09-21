import { useQuery } from "react-query";
import { getAllTests } from "../../services/test-service";
import { Card } from "primereact/card";
import PaginatorPage from "../../components/PaginatorPage";
import { useState } from "react";
import { Tag } from "primereact/tag";
import formatDate from "../../utils/format-date";
import { TestGetDto, TestStatus } from "../../models/test";
import { Button } from "primereact/button";
import useToggle from "../../hooks/useToggle";
import { Dialog } from "primereact/dialog";
import GradeList from "./components/GradeList";

const TestChecking = () => {
  const [page, setPage] = useState(1);

  const { data: testsData } = useQuery({
    queryFn: () =>
      getAllTests({ page, published: "true" }).then((res) => res.data),
    queryKey: ["tests-checking", page],
  });

  const [selectedTest, setSelectedTest] = useState<TestGetDto>();

  const showDialog = useToggle();

  return (
    <div>
      <div style={{ display: "grid", gap: "20px" }}>
        {testsData?.tests.map((test) => {
          return (
            <Card key={test.id} title={test.title}>
              <div style={{ display: "grid", gap: "20px" }}>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <span style={{ fontWeight: "bold" }}>Empieza en:</span>
                    <span>
                      {formatDate(test.startDate as string, "simplified")}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <span style={{ fontWeight: "bold" }}>Acaba en:</span>
                    <span>{formatDate(test.endDate, "simplified")}</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 0",
                }}
              >
                <span>Creado por:</span>
                <span>{test.userFullname.toUpperCase()}</span>
                <Tag value={test.userCode} />
              </div>
              <div style={{ paddingBottom: "10px" }}>
                <Button
                  label="Revisar resultados"
                  onClick={() => {
                    setSelectedTest(test);
                    showDialog.setTrue();
                  }}
                />
              </div>
              <Tag
                severity={
                  test?.status !== TestStatus.active ? "danger" : "success"
                }
                value={test?.status}
              />
              <Tag
                severity={"info"}
                value={formatDate(test.createdAt || "", "simplified")}
              />
            </Card>
          );
        })}
      </div>

      <Dialog
        header={selectedTest?.title}
        draggable={false}
        visible={showDialog.value}
        onHide={() => showDialog.setFalse()}
        style={{ width: "50vw" }}
      >
        <GradeList test={selectedTest} />
      </Dialog>

      <PaginatorPage
        limit={10}
        total={testsData?.count}
        onPage={(page) => {
          setPage(page + 1);
        }}
      />
    </div>
  );
};

export default TestChecking;

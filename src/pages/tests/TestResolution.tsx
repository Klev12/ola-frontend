import { useQuery } from "react-query";
import { getAllTestToResolve } from "../../services/test-service";
import NormalModeCard from "./components/NormalModeCard";
import { GradeStatus } from "../../models/grade";
import { Tag } from "primereact/tag";
import ROUTES from "../../consts/routes";
import { Card } from "primereact/card";

const TestResolution = () => {
  const { data: testsData } = useQuery({
    queryFn: () => getAllTestToResolve({}).then((res) => res.data),
    queryKey: ["tests-resolve"],
  });

  return (
    <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
      {testsData?.tests.map((test) => {
        return (
          <Card key={test.id}>
            <NormalModeCard test={test}>
              {test.grades.map((grade) => {
                return (
                  <div key={grade.id}>
                    {grade?.score && (
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginTop: "20px",
                          alignItems: "center",
                        }}
                      >
                        {grade?.status === GradeStatus.resolved && (
                          <a
                            href={`${ROUTES.PDF.TEST_ID(
                              test.id as number
                            )}?userId=${grade.userId}`}
                            target="_blank"
                          >
                            Ver pdf
                          </a>
                        )}
                        {grade?.status === GradeStatus.resolved && (
                          <div>
                            <span>Calificación: </span>{" "}
                            <Tag value={`${grade.score} / ${test.score}`} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </NormalModeCard>
          </Card>
        );
      })}
    </div>
  );
};

export default TestResolution;

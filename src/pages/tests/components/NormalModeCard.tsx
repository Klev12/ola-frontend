import { TestGetDto, TestStatus } from "../../../models/test";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import ROUTES from "../../../consts/routes";
import { useNavigate } from "react-router";
import { ReactNode } from "react";
import { GradeGetDto, GradeStatus } from "../../../models/grade";
import { Tag } from "primereact/tag";
import formatDate from "../../../utils/format-date";
import Timer from "../../../components/Timer";
import useToggle from "../../../hooks/useToggle";

interface NormalModeCardProps {
  test?: TestGetDto & { grade?: GradeGetDto };
  children?: ReactNode;
}

const NormalModeCard = ({ test, children }: NormalModeCardProps) => {
  const navigate = useNavigate();
  const canSubmit = useToggle(true);

  return (
    <div>
      <div style={{ display: "grid", gap: "20px" }}>
        {test?.published && (
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
        )}
        {test?.grade?.expireTime &&
          test.grade.status !== GradeStatus.resolved && (
            <Timer
              expiryTimestamp={new Date(test.grade.expireTime)}
              onExpireFn={() => {
                canSubmit.setFalse();
              }}
            />
          )}
        <div style={{ display: "flex", gap: "20px" }}>
          <Tag
            style={{ width: "fit-content" }}
            severity={
              test?.grade?.status === GradeStatus.resolved ? "success" : "info"
            }
            value={
              test?.grade?.status === GradeStatus.resolved
                ? "prueba resuelta"
                : "prueba no resuelta"
            }
          />
          <Tag
            severity={test?.status !== TestStatus.active ? "danger" : "success"}
            value={test?.status}
          />
        </div>
      </div>
      <h2>{test?.title}</h2>
      <Button
        label="Resolver"
        disabled={
          test?.status !== TestStatus.active ||
          test.grade?.status === GradeStatus.resolved ||
          !canSubmit.value
        }
        icon={PrimeIcons.EYE}
        onClick={() => {
          navigate(ROUTES.TESTS.RESOLVER_TEST_ID(test?.id as number));
        }}
      />
      {children}
    </div>
  );
};

export default NormalModeCard;

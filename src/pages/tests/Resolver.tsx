import { useMutation, useQuery } from "react-query";
import GlobalPrintForm from "../../components/global-print-form/GlobalPrintForm";
import { useNavigate, useParams } from "react-router";
import { getTestById } from "../../services/test-service";
import gradeService from "../../services/grade-service";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import GoBackButton from "../../components/GoBackButton";
import Timer from "../../components/Timer";
import ROUTES from "../../consts/routes";
import { useMemo, useRef } from "react";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";

const Resolver = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const { data: testData } = useQuery({
    queryFn: () => getTestById({ id: Number(id) }).then((res) => res.data),
    queryKey: ["tests", id],
  });

  const { data: gradesData, refetch: refetchGrades } = useQuery({
    queryFn: () =>
      gradeService.findAll({ testId: Number(id) }).then((res) => res.data),
    queryKey: ["grades", id],
  });

  useQuery({
    queryFn: () => gradeService.startTimer({ testId: Number(id) }),
    queryKey: ["start-timer", id],
    onSuccess: () => {
      refetchGrades();
    },
    retry: 1,
  });

  const { mutate: submitGrade } = useMutation(gradeService.submit, {
    onSuccess: () => {
      navigate(ROUTES.TESTS.ME);
    },
    onError: (error: AxiosError<{ error?: { message?: string } }>) => {
      const message = error.response?.data.error?.message;
      toast.current?.show({
        summary: "Error",
        detail: message,
        severity: "error",
      });
    },
  });

  const currentGrade = useMemo(() => {
    return gradesData?.grades?.find(
      (grade) => grade.testId === testData?.test.id
    );
  }, [gradesData, testData]);

  return (
    <div>
      <Toast ref={toast} />
      <GlobalPrintForm
        showHeader={true}
        customHeaderTemplate={() => (
          <>
            <GoBackButton />
            {currentGrade?.expireTime && (
              <Timer
                expiryTimestamp={new Date(currentGrade.expireTime)}
                onExpireFn={() => {
                  navigate(ROUTES.TESTS.ME);
                }}
              />
            )}
          </>
        )}
        formScheme={testData?.formScheme}
        onSubmit={(data) => {
          confirmDialog({
            acceptLabel: "Sí",
            header: "Confirmación",
            message:
              "¿Estás seguro de subir los datos de la prueba (los datos de la prueba no podrán ser modificados después)?",
            accept: () => {
              submitGrade({
                testId: testData?.test.id as number,
                results: data.map((field) => {
                  return field.response.value;
                }),
              });
            },
          });
        }}
      />
      <ConfirmDialog draggable={false} style={{ width: "70vw" }} />
    </div>
  );
};

export default Resolver;

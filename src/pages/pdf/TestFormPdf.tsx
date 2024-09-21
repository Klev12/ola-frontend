import { useParams } from "react-router";
import { getTestById } from "../../services/test-service";
import FormPdf from "./components/FormPdf";
import { useQuery } from "react-query";
import gradeService from "../../services/grade-service";
import { useMemo } from "react";
import { TestGetDto } from "../../models/test";
import { GradeGetDto } from "../../models/grade";
import { useSearchParams } from "react-router-dom";

const TestFormPdf = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { data: testData, isLoading } = useQuery({
    queryFn: () =>
      getTestById({
        id: Number(id),
        userId: Number(searchParams.get("userId")),
      }).then((res) => res.data),
    queryKey: ["user-form-by-user-id", id, searchParams.get("userId")],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: gradeData } = useQuery({
    queryFn: () =>
      gradeService
        .findAll({
          testId: Number(id),
          userId: Number(searchParams.get("userId")),
        })
        .then((res) => res.data),
    queryKey: ["grade-test-user", id, searchParams.get("userId")],
  });

  const test = useMemo(() => {
    const grade = gradeData?.grades?.find(
      (grade) =>
        grade.testId === testData?.test.id &&
        grade.userId === Number(searchParams.get("userId"))
    );
    return { ...testData?.test, grade } as TestGetDto & { grade?: GradeGetDto };
  }, [testData, gradeData, searchParams]);

  return (
    <>
      {testData && (
        <FormPdf
          type="test-form"
          test={test}
          formScheme={testData?.formScheme}
        />
      )}
      {!testData && !isLoading && <div>formulario no encontrado</div>}
    </>
  );
};

export default TestFormPdf;

import { Button } from "primereact/button";
import { useMutation, useQuery } from "react-query";
import { createNewTest, getAllTests } from "../../services/test-service";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

const Tests = () => {
  const {
    data: testsData,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: () => getAllTests().then((res) => res.data),
  });

  const { mutate: createNewTestMutate, isLoading: isLoadingCreateNewTest } =
    useMutation(createNewTest, {
      onSuccess: () => {
        refetch();
      },
    });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );
          createNewTestMutate({ title: formData["title"] as string });
        }}
      >
        <InputText placeholder="Titulo de prueba" name="title" />
        <Button
          disabled={isRefetching || isLoadingCreateNewTest}
          label="Crear nueva prueba"
        />
      </form>
      {testsData?.tests.length === 0 && <span>No hay pruebas, crea una!</span>}
      {testsData?.tests.map((test) => {
        return <Card title={test.title}></Card>;
      })}
    </>
  );
};

export default Tests;

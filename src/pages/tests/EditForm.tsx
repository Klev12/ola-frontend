import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { getTestById, markTestAsPublished } from "../../services/test-service";
import EditSelectOptions from "./components/EditSelectOptions";
import GoBackButton from "../../components/GoBackButton";
import { Button } from "primereact/button";
import useToggle from "../../hooks/useToggle";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import ROUTES from "../../consts/routes";

const EditForm = () => {
  const { id } = useParams();
  const showDialog = useToggle();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  const { data: formSchemeData, refetch: refetchFormScheme } = useQuery({
    queryFn: () => getTestById({ id: Number(id) }).then((res) => res.data),
    queryKey: ["form-scheme", id],
  });

  const { mutate: markTestAsPublishedMutate } = useMutation(
    markTestAsPublished,
    {
      onSuccess: () => {
        refetchFormScheme();
        showDialog.setFalse();
        navigate(ROUTES.TESTS.ME);
      },
    }
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <GoBackButton />
      <h2>{formSchemeData?.test.title}</h2>
      <div>
        {formSchemeData?.formScheme.form_groups.map((formGroup) => {
          return (
            <div key={formGroup.id}>
              <h4>{formGroup.label}</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {formGroup.fields.map((field) => {
                  return (
                    <div
                      key={field.id}
                      style={{ border: "1px solid black", padding: "10px" }}
                    >
                      <EditSelectOptions
                        disabled={formSchemeData.test.published}
                        field={field}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Button
        disabled={formSchemeData?.test.published}
        label="Subir"
        style={{ marginTop: "20px" }}
        onClick={() => {
          showDialog.setTrue();
          setEndDate(new Date());
          setStartDate(new Date());
        }}
      />
      <Dialog
        header="Confirmación"
        draggable={false}
        visible={showDialog.value}
        onHide={() => showDialog.setFalse()}
        style={{ width: "90vw" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            markTestAsPublishedMutate({
              testId: formSchemeData?.test.id as number,
              startDate: startDate?.toISOString() || "",
              endDate: endDate?.toISOString() || "",
            });
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "end",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div style={{ width: "45%" }}>
              <div style={{ fontWeight: "bold" }}>Fecha de inicio:</div>
              <Calendar
                style={{ width: "100%", minWidth: "200px" }}
                showTime
                hourFormat="12"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.value || new Date());
                  setEndDate(e.value || new Date());
                }}
                inline
                required
                minDate={new Date()}
                invalid
              />
            </div>
            <div style={{ width: "45%", minWidth: "200px" }}>
              <div style={{ fontWeight: "bold" }}>Fecha de fin:</div>
              <Calendar
                style={{ width: "100%" }}
                showTime
                hourFormat="12"
                value={endDate}
                onChange={(e) => setEndDate(e.value || new Date())}
                inline
                required
                minDate={startDate || new Date()}
              />
            </div>
          </div>
          <p>
            Estás seguro de proceder (luego de aceptar no podrás editar la
            prueba)
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              label="No"
              type="button"
              onClick={() => showDialog.setFalse()}
            />
            <Button label="Sí" />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default EditForm;

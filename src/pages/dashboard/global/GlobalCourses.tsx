import { useMutation, useQuery } from "react-query";
import ListElements from "./ListElements";
import courseService from "../../../services/course-service";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import PaginatorPage from "../../../components/PaginatorPage";
import { useState } from "react";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const GlobalCourses = () => {
  const [page, setPage] = useState(1);

  const [text, setText] = useState("");
  const [html, setHtml] = useState("");

  const showCreationDialog = useToggle();

  const { data: coursesData, refetch: refetchAllCourses } = useQuery({
    queryFn: () => courseService.findAll({ page }).then((res) => res.data),
  });

  const { mutate: createCourse } = useMutation(courseService.save, {
    onSuccess: () => {
      refetchAllCourses();
      showCreationDialog.setFalse();
    },
  });

  const { mutate: patchCourse } = useMutation(courseService.patch, {
    onSuccess: () => {
      refetchAllCourses();
    },
  });

  const { mutate: deleteCourse } = useMutation(courseService.delete, {
    onSuccess: () => {
      refetchAllCourses();
    },
  });

  return (
    <div>
      <Button
        label="Crear nueva capacitación"
        icon={PrimeIcons.PLUS}
        onClick={() => showCreationDialog.setTrue()}
      />
      {coursesData?.count === 0 && <p>No hay capacitaciones</p>}
      <Dialog
        draggable={false}
        style={{ width: "50vw" }}
        visible={showCreationDialog.value}
        onHide={() => showCreationDialog.setFalse()}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target as HTMLFormElement)
            );

            createCourse({
              description: text,
              html,
              price: formData?.["price"]?.toString(),
              title: formData?.["title"]?.toString(),
            });
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Título</label>
            <InputText placeholder="Título" name="title" required />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Título</label>
            <Editor
              placeholder="Descripción"
              name="description"
              style={{ height: "300px" }}
              onTextChange={(e) => {
                setText(e.textValue);
                setHtml(e.htmlValue || "");
              }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label htmlFor="">Precio</label>
            <InputText placeholder="Precio" name="price" required />
          </div>
          <Button label="Crear capacitación" />
        </form>
      </Dialog>
      <ListElements
        header={(element) => (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
              rounded
              icon={PrimeIcons.TIMES}
              onClick={() => {
                setText(element?.description);
                setHtml(element?.html);
                confirmDialog({
                  header: "Eliminar",
                  message: "¿Desea eliminar la capacitación?",
                  acceptLabel: "Sí",
                  accept: () => {
                    deleteCourse({ courseId: element?.id });
                  },
                });
              }}
            />
          </div>
        )}
        elements={coursesData?.courses || []}
        title={(course) => <>{course.title}</>}
        description={(course) => (
          <>
            <Editor
              value={course.html}
              style={{ minHeight: "40px" }}
              showHeader={false}
              disabled={true}
            />
            <div style={{ marginTop: "20px" }}>Precio: {course.price}</div>
          </>
        )}
        formTemplate={(course) => (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <InputText
                placeholder="Título"
                defaultValue={course?.title}
                name="title"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <Editor
                placeholder="Descripción"
                name="description"
                value={course?.html}
                style={{ height: "300px" }}
                onTextChange={(e) => {
                  setText(e.textValue);
                  setHtml(e.htmlValue || "");
                }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Precio</label>
              <InputText
                placeholder="Precio"
                defaultValue={course?.price}
                name="price"
              />
            </div>
          </>
        )}
        onSubmit={(data, selectedItem) => {
          patchCourse({
            title: data.title,
            price: data.price,
            description: text,
            html,
            courseId: selectedItem?.id,
          });
        }}
      />
      <ConfirmDialog draggable={false} />
      <PaginatorPage
        limit={10}
        total={coursesData?.count}
        onPage={(page) => setPage(page + 1)}
      />
    </div>
  );
};

export default GlobalCourses;

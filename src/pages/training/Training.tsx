import { useMutation, useQuery } from "react-query";
import trainingService from "../../services/training-service";
import { useEffect, useState } from "react";
import PaginatorPage from "../../components/PaginatorPage";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import TrainingCard from "./components/TrainingCard";
import { TrainingGetDto } from "../../models/training";
import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import { ENV } from "../../consts/const";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { InputText } from "primereact/inputtext";
import FileUploader from "../../components/FileUploader";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Training = () => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const [page, setPage] = useState(1);
  const [selectedTraining, setSelectedTraining] = useState<TrainingGetDto>();
  const [title, setTitle] = useState<string>();
  const showVideoDialog = useToggle();
  const showCreationDialog = useToggle();
  const showEditDialog = useToggle();

  const { data: trainingsData, refetch: refetchTrainings } = useQuery({
    queryFn: () => trainingService.findAll({ page }).then((res) => res.data),
    queryKey: ["trainings", page],
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteTrainingById } = useMutation(
    trainingService.deleteById
  );

  const { mutate: updateTrainingProperties } = useMutation(
    trainingService.updateProperties,
    {
      onSuccess: () => {
        refetchTrainings();
      },
    }
  );

  const [trainings, setTrainings] = useState<TrainingGetDto[]>([]);

  useEffect(() => {
    setTrainings(trainingsData?.trainings || []);
  }, [trainingsData]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "grid", gap: "20px" }}>
        {trainings.map((training) => {
          return (
            <TrainingCard
              key={training.id}
              training={training}
              onEdit={(training) => {
                setSelectedTraining(training);
                showEditDialog.setTrue();
              }}
              onClickButton={(training) => {
                setSelectedTraining(training);
                showVideoDialog.setTrue();
              }}
              onDelete={(training) => {
                confirmDialog({
                  header: training.title,
                  message: "¿Desea eliminar este video?",
                  acceptLabel: "Sí",
                  accept: () => {
                    setTrainings((currentTrainings) =>
                      currentTrainings.filter(
                        (element) => element.id !== training.id
                      )
                    );
                    deleteTrainingById({ trainingId: training.id });
                  },
                });
              }}
            />
          );
        })}
        <ConfirmDialog draggable={false} />
        <Dialog
          draggable={false}
          style={{ width: "90vw", maxWidth: "500px" }}
          visible={showVideoDialog.value}
          header={selectedTraining?.title}
          onHide={() => showVideoDialog.setFalse()}
        >
          <video
            controlsList="nodownload"
            style={{ width: "100%", borderRadius: "10px" }}
            controls
            onContextMenu={(e) => e.preventDefault()}
          >
            <source
              src={`${ENV.BACKEND_ROUTE}/multimedia/training/${selectedTraining?.url}`}
            />
          </video>
        </Dialog>
      </div>
      {authenticatedUser?.role === Roles.admin && (
        <Button
          icon={PrimeIcons.PLUS}
          label="Agregar video"
          style={{ marginTop: "20px" }}
          onClick={() => {
            showCreationDialog.setTrue();
          }}
        />
      )}
      <Dialog
        header="Agregar nuevo video"
        visible={showCreationDialog.value}
        draggable={false}
        onHide={() => showCreationDialog.setFalse()}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label htmlFor="">Título</label>
            <InputText
              placeholder="título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {title?.length !== 0 && (
            <FileUploader
              defaultFiles={[]}
              maxFiles={1}
              name="training-video"
              uploadUrl={`${ENV.BACKEND_ROUTE}/trainings`}
              additionalPayload={{ title }}
              deleteUrl=""
              type="video"
              accept=".mp4"
              showSpecificDelete={false}
              onAfterUpload={() => {
                showCreationDialog.setFalse();
                refetchTrainings();
              }}
            />
          )}
        </div>
      </Dialog>

      <Dialog
        header={selectedTraining?.title}
        visible={showEditDialog.value}
        draggable={false}
        onHide={() => showEditDialog.setFalse()}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label htmlFor="">Título</label>
            <InputText
              placeholder="título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              label="Subir nuevo título"
              onClick={() => {
                updateTrainingProperties({
                  trainingId: selectedTraining?.id as number,
                  title,
                });
              }}
            />
          </div>
          {title?.length !== 0 && (
            <FileUploader
              defaultFiles={[
                {
                  id: 1,
                  identifier: `${selectedTraining?.id}`,
                  url: `${ENV.BACKEND_ROUTE}/multimedia/training/${selectedTraining?.url}`,
                  status: "pendiente",
                },
              ]}
              maxFiles={1}
              name="training-video"
              uploadUrl={`${ENV.BACKEND_ROUTE}/trainings/video/${selectedTraining?.id}`}
              additionalPayload={{ title }}
              deleteUrl={""}
              type="video"
              accept=".mp4"
              showSpecificDelete={false}
              onAfterUpload={() => {
                showEditDialog.setFalse();
                refetchTrainings();
              }}
            />
          )}
        </div>
      </Dialog>

      <PaginatorPage
        limit={10}
        total={trainingsData?.count}
        onPage={(page) => {
          setPage(page + 1);
        }}
      />
    </div>
  );
};

export default Training;

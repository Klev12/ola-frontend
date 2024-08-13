import { useMutation, useQuery } from "react-query";
import collaboratorLinkService from "../../../services/collaborator-link-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { CollaboratorLinkGetDto } from "../../../models/collaborator-link";
import copyText from "../../../utils/copy-text";
import ROUTES from "../../../consts/routes";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const CollaboratorLinkList = () => {
  const toast = useRef<Toast>(null);

  const { data: collaboratorLinkData, refetch: refetchCollaboratorLinks } =
    useQuery({
      queryFn: () => collaboratorLinkService.findAll().then((res) => res.data),
    });

  const { mutate: createCollaboratorLink } = useMutation(
    collaboratorLinkService.create,
    {
      onSuccess: () => {
        refetchCollaboratorLinks();
      },
    }
  );
  const { mutate: invalidateCollaboratorLink } = useMutation(
    collaboratorLinkService.invalidateLink,
    {
      onSuccess: () => {
        refetchCollaboratorLinks();
        toast.current?.show({
          severity: "error",
          summary: "Link eliminado",
        });
      },
    }
  );

  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <Toast ref={toast} />
      <DataTable
        value={collaboratorLinkData?.collaboratorLinks}
        emptyMessage="No hay links disponibles"
      >
        <Column header="Link usado" field="used" />
        <Column
          header="Link"
          body={(value: CollaboratorLinkGetDto) => (
            <Button
              label="Copiar"
              onClick={() => {
                copyText(
                  `${window.location.host}${ROUTES.SIGNUP_CODE_STRING(
                    value.token
                  )}`
                );
                toast.current?.show({
                  severity: "success",
                  summary: "Link copiado",
                });
              }}
            />
          )}
        />
        <Column
          body={(value: CollaboratorLinkGetDto) => (
            <Button
              severity="danger"
              label="Eliminar"
              onClick={() => invalidateCollaboratorLink(value.id as number)}
            />
          )}
        />
      </DataTable>
      <Button
        label="Crear nuevo token"
        onClick={() => createCollaboratorLink()}
      />
    </div>
  );
};

export default CollaboratorLinkList;

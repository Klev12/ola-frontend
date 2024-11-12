import { DataTable } from "primereact/datatable";
import ShowElementList, {
  ShowElementListRef,
} from "../../../../components/show-element-list/ShowElementList";
import {
  CollaboratorLinkGetDto,
  MemberLinkType,
} from "../../../../models/collaborator-link";
import collaboratorLinkService from "../../../../services/collaborator-link-service";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import copyText from "../../../../utils/copy-text";
import { useMutation } from "react-query";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface MemberLinkListProps {
  type: MemberLinkType;
}

const MemberLinkList = ({ type }: MemberLinkListProps) => {
  const toast = useRef<Toast>(null);
  const memberList = useRef<ShowElementListRef>(null);

  const { mutate: createLink, isLoading: isCreating } = useMutation(
    collaboratorLinkService.create,
    {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          detail: "Nuevo link creado",
        });
        memberList.current?.refetch();
      },
    }
  );

  const { mutate: invalidateLink, isLoading: isDeleting } = useMutation(
    collaboratorLinkService.invalidateLink,
    {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          detail: "El link ha sido eliminado",
        });

        memberList.current?.refetch();
      },
    }
  );

  return (
    <>
      <Toast ref={toast} />
      <ShowElementList
        ref={memberList}
        url={collaboratorLinkService.api.base}
        queryKey={`member-links-${type}`}
        expanded={true}
        params={{ values: { type } }}
        allElement={(links: CollaboratorLinkGetDto[]) => (
          <DataTable value={links}>
            <Column
              header="Link"
              body={(link: CollaboratorLinkGetDto) => (
                <Button
                  label="Copiar link"
                  outlined
                  onClick={() => {
                    copyText(`${window.location.host}/signup/${link.token}`);

                    toast.current?.show({
                      severity: "success",
                      detail: "Link copiado",
                    });
                  }}
                />
              )}
            />
            <Column header="Tipo" field="type" />
            <Column
              header="Eliminar"
              body={(link: CollaboratorLinkGetDto) => (
                <Button
                  loading={isDeleting}
                  disabled={isDeleting}
                  label="Eliminar"
                  severity="danger"
                  onClick={() => {
                    invalidateLink(link.id as number);
                  }}
                />
              )}
            />
          </DataTable>
        )}
      />
      <Button
        style={{ margin: "10px" }}
        label="Crear nuevo link"
        disabled={isCreating}
        loading={isCreating}
        onClick={() => {
          createLink({ type });
        }}
      />
    </>
  );
};

export default MemberLinkList;

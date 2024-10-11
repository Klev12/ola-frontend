import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { FormEventHandler, ReactNode, useMemo, useState } from "react";
import useToggle from "../../hooks/useToggle";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import SelectCrud from "./SelectCrud";
import { useMutation } from "react-query";
import { ServiceScheme } from "../services/service-crud-scheme";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface Option {
  value: string;
  label?: string;
}

interface Scheme {
  [key: string]: {
    title?: boolean;
    subtitle?: boolean;
    tag?: boolean;
    inputText?: boolean;
    inputArea?: boolean;
    editor?: boolean;
    label?: string;
    select?: boolean;
    options?: Option[];
    required?: boolean;
  };
}

interface BasicCrudOperations<T extends object> {
  elements: T[];
  notIncludeKeys?: (keyof T)[];
  notIncludeKeysInEdition?: (keyof T)[];
  scheme?: Scheme;
  keyWord?: keyof T;
  createApi?: string;
  patchApi?: string;
  deleteByIdApi?: string;
  identifier?: string;
  patchIdentifierName?: string;
  onAfterSuccessQuery?: () => void;
  body?: (obj?: T) => ReactNode;
  showCreationButton?: boolean;
}

function getKeys<T extends object>(
  obj: T,
  notInclude?: (keyof T)[]
): (keyof T)[] {
  return Object.keys(obj).filter(
    (key) => !notInclude?.includes(key as keyof T)
  ) as (keyof T)[];
}
export default function BasicCrudOperations<T extends object>({
  elements,
  notIncludeKeys,
  notIncludeKeysInEdition,
  scheme,
  keyWord,
  createApi,
  deleteByIdApi,
  identifier,
  patchIdentifierName,
  patchApi,
  onAfterSuccessQuery,
  body,
  showCreationButton,
}: BasicCrudOperations<T>) {
  const showEditionMenu = useToggle();
  const [formMode, setFormMode] = useState<"edition" | "creation">("edition");

  const firstElement = useMemo(() => {
    return scheme;
  }, [scheme]);

  const [selectedItem, setSelectedItem] = useState<T>();

  const keys = getKeys((firstElement as T) || {}, notIncludeKeys);
  const editionKeys = getKeys(
    (firstElement as T) || {},
    notIncludeKeysInEdition
  );

  const { mutate: create } = useMutation(
    (data: unknown) => new ServiceScheme({ api: createApi ?? "" }).create(data),
    {
      onSuccess: () => {
        showEditionMenu.setFalse();
        if (onAfterSuccessQuery) onAfterSuccessQuery();
      },
    }
  );

  const { mutate: patch, isLoading: isPatching } = useMutation(
    (data: unknown) => new ServiceScheme({ api: patchApi ?? "" }).patch(data),
    {
      onSuccess: () => {
        showEditionMenu.setFalse();
        if (onAfterSuccessQuery) onAfterSuccessQuery();
      },
    }
  );

  const { mutate: deleteById, isLoading: isDeleting } = useMutation(
    (id: number) =>
      new ServiceScheme({ api: deleteByIdApi ?? "" }).deleteById(id),
    {
      onSuccess: () => {
        if (onAfterSuccessQuery) onAfterSuccessQuery();
      },
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    if (formMode === "edition") {
      patch({
        ...formData,
        [patchIdentifierName || "id"]: selectedItem?.[identifier as keyof T],
      });
      return;
    }

    create({ ...formData });
  };

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {showCreationButton && (
        <Button
          style={{ margin: "20px", maxWidth: "200px" }}
          label="Crear nuevo"
          icon={PrimeIcons.PLUS}
          onClick={() => {
            setFormMode("creation");
            showEditionMenu.setTrue();
            setSelectedItem(undefined);
          }}
        />
      )}

      {elements.map((element, index) => {
        return (
          <Card key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                outlined
                icon={PrimeIcons.PENCIL}
                onClick={() => {
                  setFormMode("edition");
                  showEditionMenu.setTrue();
                  setSelectedItem(element);
                }}
              />

              <Button
                rounded
                icon={PrimeIcons.TIMES}
                loading={isDeleting}
                disabled={isDeleting}
                onClick={() => {
                  confirmDialog({
                    message: "¿Desea eliminar el elemento?",
                    acceptLabel: "Sí",
                    accept: () => {
                      deleteById(element?.[identifier as keyof T] as number);
                    },
                  });
                }}
              />
            </div>
            {keys.map((key, index) => {
              return (
                <div key={index}>
                  {scheme?.[key as string]?.title && (
                    <h2>{String(element[key])}</h2>
                  )}
                  {scheme?.[key as string]?.subtitle && (
                    <div>{String(element[key])}</div>
                  )}
                  {scheme?.[key as string]?.tag && (
                    <Tag value={String(element[key])} />
                  )}
                </div>
              );
            })}
            {body && body(element)}
          </Card>
        );
      })}
      <ConfirmDialog draggable={false} />
      <Dialog
        header={(selectedItem?.[keyWord as keyof T] as string) || ""}
        draggable={false}
        style={{
          width: "50vw",
          minWidth: "200px",
          maxWidth: "600px",
        }}
        visible={showEditionMenu.value}
        onHide={() => showEditionMenu.setFalse()}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {editionKeys.map((key, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginTop: "20px",
                }}
                key={index}
              >
                <label style={{ fontWeight: "bold" }} htmlFor="">
                  {scheme?.[key as string]?.label || (key as string)}:
                </label>
                {scheme?.[key as string]?.inputText && (
                  <>
                    <InputText
                      name={key as string}
                      required={scheme?.[key as string]?.required}
                      defaultValue={selectedItem?.[key] as string}
                    />
                  </>
                )}
                {scheme?.[key as string]?.select && (
                  <>
                    <SelectCrud
                      required={scheme?.[key as string]?.required}
                      name={key as string}
                      defaultValue={selectedItem?.[key] as string}
                      options={
                        scheme?.[key as string]?.options?.map((option) => ({
                          value: option.value,
                          label: option.label ? option.label : option.value,
                        })) || []
                      }
                    />
                  </>
                )}
              </div>
            );
          })}
          <Button
            label="Subir cambios"
            loading={isPatching}
            disabled={isPatching}
          />
        </form>
      </Dialog>
    </div>
  );
}

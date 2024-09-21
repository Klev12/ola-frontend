import { useMutation, useQuery } from "react-query";
import termAndConditionsService from "../../../services/term-and-conditions-service";

import useToggle from "../../../hooks/useToggle";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import ListElements from "./ListElements";
import { Editor } from "primereact/editor";
import { Tag } from "primereact/tag";
import { useSearchParams } from "react-router-dom";
import { TermAndConditionsType } from "../../../models/term-and-conditions";

const GlobalTermsAndConditions = () => {
  const showEditMenu = useToggle();
  const [searchParams] = useSearchParams();

  const [html, setHtml] = useState<string>();
  const [text, setText] = useState<string>();

  const {
    data: termAndConditionsData,
    refetch: refetchAllTermAndConditions,
    isLoading,
  } = useQuery({
    queryFn: () =>
      termAndConditionsService
        .findAll({ type: searchParams.get("type") as TermAndConditionsType })
        .then((res) => res.data),
    queryKey: ["all-term-and-conditions", searchParams.get("type")],
  });

  const {
    mutate: patchTermAndConditions,
    isLoading: patchingTermAndConditions,
  } = useMutation(termAndConditionsService.patch, {
    onSuccess: () => {
      showEditMenu.setTrue();
      refetchAllTermAndConditions();
    },
    onSettled: () => {
      showEditMenu.setFalse();
    },
  });

  return (
    <div>
      <h2>
        {searchParams.get("type") === TermAndConditionsType.userForm
          ? "Contratos de usuarios"
          : "Contratos de ventas"}
      </h2>
      <ListElements
        loading={isLoading}
        header={(termAndCondition) => (
          <>
            <Tag value={termAndCondition.type} />
          </>
        )}
        elements={termAndConditionsData?.termAndConditions || []}
        title={(termAndCondition) => <>{termAndCondition.title}</>}
        description={(termAndCondition) => (
          <Editor
            value={termAndCondition.html || termAndCondition.description}
            style={{ height: 150 }}
            showHeader={false}
            readOnly
          />
        )}
        formTemplate={(selectedTermAndCondition) => (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <InputText
                placeholder="Título"
                defaultValue={selectedTermAndCondition?.title}
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
                value={
                  selectedTermAndCondition?.html ||
                  selectedTermAndCondition?.description
                }
                onTextChange={(e) => {
                  setHtml(e.htmlValue || "");
                  setText(e.textValue);
                }}
                style={{ height: "300px" }}
              />
            </div>
          </>
        )}
        onSubmit={(data, currentTermAndCondition) => {
          patchTermAndConditions({
            title: data.title,
            termAndConditionsId: currentTermAndCondition?.id as number,
            description: text,
            html,
          });
        }}
        disabledButtons={patchingTermAndConditions}
      />
    </div>
  );
};

export default GlobalTermsAndConditions;

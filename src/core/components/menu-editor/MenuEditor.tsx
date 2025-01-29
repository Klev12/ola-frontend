import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface MenuEditorOptions {
  enableEditionMode?: boolean;
  globalPayload?: object;
}

interface MenuEditorProps extends MenuEditorOptions {
  children: ReactNode;
  showEditionCheckbox?: boolean;
}

interface MenuEditorContextProps extends MenuEditorOptions {
  showSuccessMessage: (message: string) => void;
  showErrorMessage: (message: string) => void;
}

export const MenuEditorContext = React.createContext<MenuEditorContextProps>({
  enableEditionMode: false,
  globalPayload: {},
  showErrorMessage: () => {},
  showSuccessMessage: () => {},
});

const MenuEditor = ({
  enableEditionMode = false,
  showEditionCheckbox = true,
  globalPayload = {},
  children,
}: MenuEditorProps) => {
  const toast = useRef<Toast>(null);
  const [editionMode, setEditionMode] = useState(enableEditionMode);

  useEffect(() => {
    setEditionMode(enableEditionMode);
  }, [enableEditionMode]);

  return (
    <MenuEditorContext.Provider
      value={{
        enableEditionMode: editionMode,
        globalPayload,
        showSuccessMessage: (message) => {
          toast.current?.show({
            summary: "Éxito",
            detail: message,
            severity: "success",
          });
        },
        showErrorMessage: (message) => {
          toast.current?.show({
            summary: "Error",
            detail: message,
            severity: "error",
          });
        },
      }}
    >
      <Toast ref={toast} />
      {showEditionCheckbox && (
        <div style={{ display: "flex", gap: "10px" }}>
          <span>Edición {editionMode ? "activado" : "desactivado"}</span>
          <Checkbox
            checked={editionMode}
            onChange={() => setEditionMode(!editionMode)}
          />
        </div>
      )}
      {children}
    </MenuEditorContext.Provider>
  );
};

export default MenuEditor;

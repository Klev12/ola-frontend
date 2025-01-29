import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MenuEditorContext } from "../MenuEditor";
import { HTTP_UPDATE_METHOD } from "../types/method";
import { Dropdown } from "primereact/dropdown";

import { SelectItemOptionsType } from "primereact/selectitem";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { useMutation } from "react-query";
import { ServiceScheme } from "../../../services/service-crud-scheme";
import { AxiosError } from "axios";
import useToggle from "../../../../hooks/useToggle";

interface MenuSelectProps {
  url: string;
  name: string;
  label?: string;
  method?: HTTP_UPDATE_METHOD;
  defaultValue?: string | number;
  children: ReactNode;
}

interface MenuSelectContextProps {
  options: SelectItemOptionsType;
  setOptions: (options: SelectItemOptionsType) => void;
  addOption: (option: object) => void;
  defaultValue?: string | number;
}

export const MenuSelectContext = createContext<MenuSelectContextProps>({
  options: [],
  setOptions: () => {},
  addOption: () => {},
});

const MenuSelect = ({
  url,
  name,
  method = "PATCH",
  defaultValue,
  label,
  children,
}: MenuSelectProps) => {
  const {
    enableEditionMode,
    showSuccessMessage,
    showErrorMessage,
    globalPayload,
  } = useContext(MenuEditorContext);

  const [value, setValue] = useState(defaultValue);
  const { value: isValueSuccesfullyUpdated, setTrue } = useToggle(false);
  const [options, setOptions] = useState<SelectItemOptionsType>([]);

  useEffect(() => {
    if (!isValueSuccesfullyUpdated) {
      setValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableEditionMode]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const { mutate: update, isLoading } = useMutation({
    mutationFn: (obj: object) =>
      method === "PATCH"
        ? new ServiceScheme({ api: url }).patch({ ...globalPayload, ...obj })
        : new ServiceScheme({ api: url }).put({ ...globalPayload, ...obj }),
    onError: (err: AxiosError<{ error?: { message?: string } }>) => {
      const message = err.response?.data?.error?.message;
      showErrorMessage(message || "");
      setValue(defaultValue);
    },
    onSuccess: () => {
      showSuccessMessage(`${label} fue actualizado correctamente`);
      setTrue();
    },
  });

  return (
    <MenuSelectContext.Provider
      value={{
        options,
        setOptions,
        addOption: (option) => {
          setOptions((options) =>
            [...options, option].filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.value === value.value)
            )
          );
        },
        defaultValue: value,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{ fontWeight: "bold", margin: "10px 0" }}
          htmlFor={`I${name}-input`}
        >
          {label}
        </label>
        {enableEditionMode && (
          <Dropdown
            name={name}
            id={`I${name}-input`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={options}
            disabled={isLoading}
          ></Dropdown>
        )}
        {children}
        {enableEditionMode && (
          <Button
            style={{ alignSelf: "end", margin: "10px 0" }}
            size="small"
            rounded
            icon={PrimeIcons.UPLOAD}
            disabled={isLoading}
            loading={isLoading}
            onClick={() => {
              update({ [name]: value });
            }}
          />
        )}
      </div>
    </MenuSelectContext.Provider>
  );
};

export default MenuSelect;

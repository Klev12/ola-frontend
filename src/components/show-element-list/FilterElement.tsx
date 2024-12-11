import SearchInput from "../SearchInput";
import { Button } from "primereact/button";

import { Dialog } from "primereact/dialog";
import useToggle from "../../hooks/useToggle";
import { Calendar } from "primereact/calendar";
import { SelectButton } from "primereact/selectbutton";
import { Checkbox } from "primereact/checkbox";
import { createContext, ReactNode, useEffect, useState } from "react";
import DropdownFilter from "./components/DropdownFilter";
import { PrimeIcons } from "primereact/api";
import { GroupBySummary } from "../../core/types/summary";

interface FilterOptions {
  placeholder?: string;
  type: "select" | "input";
  options?: Options[];
  defaultValue?: string | number;
  arrayValue?: boolean;
}

interface Options {
  label: string;
  value: string | number | "no-defined";
}

type Filters<T> = { [key in keyof T]: FilterOptions };

interface FilterElementProps<T> {
  showKeywordSearch?: boolean;
  showOwnershipFilter?: boolean;
  showRemoveAllFilters?: boolean;
  filters: Filters<T>;
  onFilter?: (params: {
    [key in keyof T]?: string | number | string[] | number[] | undefined;
  }) => void;
  children?: ReactNode;
}

interface FilterContextProps {
  setParams: (params: object) => void;
  params: object;
  removeAllFilter: boolean;
}

export const FilterContext = createContext<FilterContextProps>({
  params: {},
  setParams: () => {},
  removeAllFilter: false,
});

function FilterElement<T>({
  showKeywordSearch = true,
  showOwnershipFilter = true,
  showRemoveAllFilters = true,
  filters,
  onFilter,
  children,
}: FilterElementProps<T>) {
  const showFilters = useToggle();
  const removeAllFilter = useToggle();
  const [filterParams, setFilterParams] = useState<{
    [key in keyof T]?: string | number | string[] | number[] | undefined;
  }>({});
  useEffect(() => {
    if (onFilter) onFilter(filterParams);
  }, [filterParams]);

  useEffect(() => {
    if (removeAllFilter.value) {
      removeAllFilter.setFalse();
    }
  }, [removeAllFilter.value]);

  return (
    <FilterContext.Provider
      value={{
        params: filterParams,
        setParams: setFilterParams,
        removeAllFilter: removeAllFilter.value,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Filtrar por</h3>

        {showRemoveAllFilters && (
          <Button
            style={{ height: "fit-content" }}
            outlined
            icon={PrimeIcons.TRASH}
            label="Quitar filtros"
            onClick={() => {
              setFilterParams({});
              removeAllFilter.setTrue();
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {showKeywordSearch && (
          <div style={{ width: "200px" }}>
            <SearchInput
              onSearch={(value) =>
                setFilterParams({ ...filterParams, keyword: value })
              }
            />
          </div>
        )}

        <DropdownFilter
          placeholder="Agrupar por"
          options={[
            { label: "Todos", value: GroupBySummary.all },
            { label: "Mes y año", value: GroupBySummary.monthAndYear },
          ]}
          onChange={(value) => {
            setFilterParams({ ...filterParams, groupBy: value });
          }}
        />

        {(Object.keys(filters) as (keyof typeof filters)[]).map(
          (key, index) => {
            return (
              <div key={index}>
                {filters[key].type === "select" && (
                  <DropdownFilter
                    placeholder={filters[key].placeholder}
                    value={
                      Array.isArray(filterParams[key])
                        ? (filterParams[key] as number[])?.[0]
                        : (filterParams[key] as string)
                    }
                    options={filters[key].options}
                    onChange={(value) => {
                      if (value === "no-defined")
                        return setFilterParams({
                          ...filterParams,
                          [key]: "",
                        });
                      setFilterParams({
                        ...filterParams,
                        [key]: filters[key].arrayValue ? [value] : value,
                      });
                    }}
                  />
                )}
              </div>
            );
          }
        )}
        {children}
        {showOwnershipFilter && (
          <DropdownFilter
            placeholder="Propiedad"
            defaultValue={"all"}
            options={[
              { label: "Todos", value: "all" },
              { label: "Creados por mí", value: "mine" },
            ]}
            onChange={(value) => {
              setFilterParams({
                ...filterParams,
                ownership: value,
              });
            }}
          />
        )}

        {/* <Button
          icon={PrimeIcons.PLUS_CIRCLE}
          label="Más filtros"
          onClick={() => showFilters.setTrue()}
        /> */}
      </div>

      <Dialog
        draggable={false}
        header="Más filtros"
        visible={showFilters.value}
        onHide={() => showFilters.setFalse()}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Calendar placeholder="Mes y año" />

          <SelectButton
            options={[{ label: "Usuarios" }, { label: "Grupos" }]}
          />
          <Checkbox checked={false} />
          <Button label="Aplicar filtros" />
        </div>
      </Dialog>
    </FilterContext.Provider>
  );
}

export default FilterElement;

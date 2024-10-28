import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import genericListService from "./service/generic-list-service";
import PaginatorPage from "../PaginatorPage";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { OwnerAccessState } from "../../models/global";

interface ShowElementListProps<T> {
  url: string;
  expanded?: boolean;
  allElement?: (elements: T[]) => ReactNode;
  eachElement?: (element: T) => ReactNode;
  limit?: number;
  dateFilter?: DateFilter;
  queryKey?: string;
  expandButtonMessage?: string;
  style?: CSSProperties;
  params?: ParamsUrl;
}

export interface ParamsUrl {
  ownership?: OwnerAccessState;
  values?: object;
}

interface DateFilter {
  month: number;
  year: number;
}

export default function ShowElementList<T>({
  url,
  limit = 10,
  dateFilter,
  queryKey,
  expanded,
  eachElement,
  allElement,
  expandButtonMessage,
  style,
  params,
}: ShowElementListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const { data: dataList, isLoading: isDataLoading } = useQuery({
    queryFn: () =>
      genericListService
        .findAll({
          url,
          options: { page, limit },
          month: dateFilter?.month,
          year: dateFilter?.year,
          params,
        })
        .then((res) => res.data),
    queryKey: [
      queryKey ?? "element-list",
      page,
      dateFilter?.month,
      dateFilter?.year,
    ],
    enabled: isExpanded,
  });

  const elementList = useMemo(() => {
    const values = Object.values(dataList ?? {});
    let count = 0;
    let listElement: T[] = [];
    for (const value of values) {
      if (typeof value === "number") {
        count = value;
      }
      if (Array.isArray(value)) {
        listElement = value;
      }
    }

    return { count, list: listElement };
  }, [dataList]);

  return (
    <div style={style}>
      <div>
        {isExpanded && (
          <>
            {isDataLoading && <ProgressSpinner />}
            {eachElement &&
              elementList.list.map((element, index) => {
                return <div key={index}>{eachElement(element)}</div>;
              })}
            {allElement && allElement(elementList.list)}
          </>
        )}
        {!isExpanded && (
          <Button
            label={expandButtonMessage}
            onClick={() => {
              setIsExpanded(true);
            }}
          />
        )}
        {isExpanded && (
          <PaginatorPage
            limit={limit}
            total={elementList.count}
            onPage={(page) => setPage(page + 1)}
          />
        )}
      </div>
    </div>
  );
}

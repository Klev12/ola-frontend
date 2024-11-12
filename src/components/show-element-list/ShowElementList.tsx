import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import genericListService from "./service/generic-list-service";
import PaginatorPage from "../PaginatorPage";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { OwnerAccessState } from "../../models/global";

interface ShowElementListProps<T> {
  url: string;
  expanded?: boolean;
  allElement?: (elements: T[], metadata: Metadata) => ReactNode;
  eachElement?: (element: T, metadata: Metadata) => ReactNode;
  limit?: number;
  dateFilter?: DateFilter;
  queryKey?: string;
  expandButtonMessage?: string;
  style?: CSSProperties;
  params?: ParamsUrl;
  emptyElementsMessage?: string;
}

export interface ShowElementListRef {
  refetch: () => void;
}

export interface ParamsUrl {
  ownership?: OwnerAccessState;
  values?: object;
}

interface DateFilter {
  month: number;
  year: number;
}

interface Metadata {
  count: number;
}

const ShowElementList = forwardRef<
  ShowElementListRef,
  ShowElementListProps<never>
>(function <T>(
  {
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
    emptyElementsMessage,
  }: ShowElementListProps<T>,
  ref: ForwardedRef<ShowElementListRef>
) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const {
    data: dataList,
    isLoading: isDataLoading,
    refetch,
  } = useQuery({
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

  useImperativeHandle(ref, () => ({
    refetch,
  }));

  return (
    <div style={style}>
      <div>
        {elementList.count === 0 && !isDataLoading && (
          <small>{emptyElementsMessage}</small>
        )}
        {isExpanded && (
          <>
            {isDataLoading && <ProgressSpinner />}
            {eachElement &&
              elementList.list.map((element, index) => {
                return (
                  <div key={index}>
                    {eachElement(element, { count: elementList.count })}
                  </div>
                );
              })}
            {allElement &&
              allElement(elementList.list, { count: elementList.count })}
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
        {isExpanded && elementList.count > 1 && (
          <PaginatorPage
            limit={limit}
            total={elementList.count}
            onPage={(page) => setPage(page + 1)}
          />
        )}
      </div>
    </div>
  );
});

export default ShowElementList;

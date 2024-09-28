import { Paginator } from "primereact/paginator";
import { useMemo, useState } from "react";

interface PaginatorPageProps {
  total?: number;
  limit?: number;
  onPage: (page: number) => void;
  simplified?: boolean;
}

const PaginatorPage = ({
  total,
  limit,
  onPage,
  simplified = false,
}: PaginatorPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [rows, setRows] = useState(limit);

  const pagesNumber = useMemo(() => {
    const pages = Math.floor((total || 1) / (limit || 1));
    return pages === 0 ? 1 : pages;
  }, [total, limit]);

  return (
    <>
      {simplified ? (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            {Array.from(Array(pagesNumber).keys())
              .slice(currentPage === 0 ? currentPage : currentPage - 1, 4)
              .map((index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "purple",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCurrentPage(index);
                      onPage(index);
                    }}
                  >
                    <span>{index + 1}</span>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <Paginator
          first={currentPage}
          rows={rows}
          totalRecords={total}
          onPageChange={(e) => {
            setCurrentPage(e.first);
            setRows(e.rows);
            onPage(e.page);
          }}
        />
      )}
    </>
  );
};

export default PaginatorPage;

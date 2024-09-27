import { Paginator } from "primereact/paginator";
import { useState } from "react";

interface PaginatorPageProps {
  total?: number;
  limit?: number;
  onPage: (page: number) => void;
}

const PaginatorPage = ({ total, limit, onPage }: PaginatorPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [rows, setRows] = useState(limit);

  return (
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
  );
};

export default PaginatorPage;

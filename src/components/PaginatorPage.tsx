import { Paginator } from "primereact/paginator";
import { useState } from "react";

interface PaginatorPageProps {
  total?: number;
  limit?: number;
  onPage: (page: number) => void;
}

const PaginatorPage = ({ total, limit, onPage }: PaginatorPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit] = useState(limit);

  return (
    <Paginator
      first={
        currentPage === 0 ? currentPage : currentPage + (currentLimit || 0)
      }
      rows={currentLimit}
      totalRecords={total}
      onPageChange={(e) => {
        setCurrentPage(e.page);
        onPage(e.page);
      }}
    />
  );
};

export default PaginatorPage;

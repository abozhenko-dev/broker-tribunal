import { FC, MouseEvent } from "react";

import { usePagination } from "@hooks";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = (props) => {
  // **Props
  const { totalPages, currentPage, handleChangePage } = props;

  const paginationRange = usePagination({
    totalPages,
    currentPage,
    buttonConst: 3,
    siblingCount: 0
  });

  const onChangePage = (e: MouseEvent<HTMLButtonElement>) => {
    handleChangePage(Number(e.currentTarget.textContent));
  };

  return (
    <div className="pagination">
      <div className="pagination-list">
        {paginationRange?.map((item, index) => {
          if (item === "...") {
            return (
              <button key={index} className="pagination-item dots">
                &#8230;
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={onChangePage}
              className={
                +currentPage === +item
                  ? "pagination-item active"
                  : "pagination-item"
              }
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

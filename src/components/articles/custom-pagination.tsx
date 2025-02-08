import React, { useState } from 'react';
import { cn } from '../../lib/utils';

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 5; // Maximum number of page numbers to display

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{ fontWeight: i === currentPage ? 'bold' : 'normal' }}
          className={cn('', {'text-green-500': i === currentPage})}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pages.unshift(<span key="start-ellipsis">...</span>);
    }

    if (endPage < totalPages) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    return pages;
  };

  return (
    <div className="flex justify-center w-full space-x-5">
      <button
        className='cursor-pointer'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {renderPageNumbers()}

      <button
        className='cursor-pointer'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
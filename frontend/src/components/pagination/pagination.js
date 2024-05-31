import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 37) { // Left arrow key
                if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                }
            } else if (event.keyCode === 39) { // Right arrow key
                if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPage, totalPages, handlePageChange]);

    const renderPagination = () => {
        const pages = [];
        const visiblePages = 3; // Number of pages to display directly
        const ellipsisThreshold = 5; // Threshold to display ellipsis
        const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);

        // Display the first page button
        if (startPage > 1) {
            pages.push(
                <Button key={1} variant={currentPage === 1 ? "danger" : "primary"} onClick={() => handlePageChange(1)} style={{ margin: '0 5px' }}>
                    1
                </Button>
            );
            // Display ellipsis if needed
            if (startPage > ellipsisThreshold) {
                pages.push(
                    <span key="ellipsis1" style={{ margin: '0 5px', fontWeight: 'bold' }}>...</span>
                );
            }
        }

        // Display the buttons from startPage to endPage
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button key={i} variant={currentPage === i ? "danger" : "primary"} onClick={() => handlePageChange(i)} style={{ margin: '0 5px' }}>
                    {i}
                </Button>
            );
        }

        // Display the last page button
        if (endPage < totalPages) {
            // Display ellipsis if needed
            if (totalPages - endPage > ellipsisThreshold - 1) {
                pages.push(
                    <span key="ellipsis2" style={{ margin: '0 5px', fontWeight: 'bold' }}>...</span>
                );
            }
            pages.push(
                <Button key={totalPages} variant={currentPage === totalPages ? "danger" : "primary"} onClick={() => handlePageChange(totalPages)} style={{ margin: '0 5px' }}>
                    {totalPages}
                </Button>
            );
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {pages}
            </div>
        );
    };

    return renderPagination();
};

export default Pagination;

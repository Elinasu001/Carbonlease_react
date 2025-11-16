import { PageButton, PaginationContainer } from './Pagination.styled';

const Pagination = ({ 
    currentPage = 1, 
    totalPages = 1, 
    pageNumbers = [],
    onFirstPage,
    onPrevPage, 
    onPageClick,
    onNextPage,
    onLastPage
}) => {
    return (
        <PaginationContainer>
            <PageButton 
                onClick={onFirstPage} 
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-double-left"></i>
            </PageButton>
            
            <PageButton 
                onClick={onPrevPage} 
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-left"></i>
            </PageButton>
            
            {pageNumbers.map(page => (
                <PageButton
                    key={page}
                    onClick={() => onPageClick && onPageClick(page)}
                    $active={currentPage === page}
                >
                    {page}
                </PageButton>
            ))}
            
            <PageButton 
                onClick={onNextPage} 
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-right"></i>
            </PageButton>
            
            <PageButton 
                onClick={onLastPage} 
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-double-right"></i>
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;

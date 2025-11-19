import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../../Common/Pagination/Pagination'
// useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 가져오고 상태를 업데이트합니다.
// useState를 사용하여 상태 변수를 선언합니다.

 const Boards = () => {
  
    const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
    const [boardList, setBoardList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost/boards?page=1')
             .then(response => {
                console.log(response.data);
                console.log("전체 건수 : " + response.data.totalPages);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
                setBoardList(response.data.boardList);

            }            
    )}, []);

    const pageMove = (page) => {
      axios.get(`http://localhost/boards?page=${page}`)
             .then(response => {
                console.log(response.data);
                console.log("전체 건수 : " + response.data.totalPages);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
                setBoardList(response.data.boardList);

            } ) 
    }
     
    const updatePageNumbers = (page, total) => {
        const maxVisible = 5;
        const blockNumber = Math.ceil(page / maxVisible);
        const start = (blockNumber - 1) * maxVisible + 1;
        const end = Math.min(blockNumber * maxVisible, total);
        
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    };

    const handleFirstPage = () => {
        console.log("handleFirstPage call !!");
        setCurrentPage(1);
        updatePageNumbers(1, totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageClick = (page) => {
      console.log("페이지 클릭" , page) ;
        setCurrentPage(page);
        pageMove(page);
        updatePageNumbers(page, totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
        updatePageNumbers(totalPages, totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <PageTitle 
                title="일반 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', current: true }
                ]} 
            />
            <PageContent>
              <div>
              전체 건수 : {currentPage} / {totalPages}
              <table>
                <tr>
                  <td>번호</td>
                  <td>제목</td>
                  <td>작성자</td>
                  <td>작성일자</td>
                  <td>조회수</td>
                </tr>
              {boardList.map((item) => (
                // 각 리스트 아이템은 고유한 'key' prop을 가져야 합니다.
                <tr key={item.boardNo}>
                  <td>{item.boardSeq}</td>
                  <td>{item.boardTitle}</td>
                  <td>{item.nickname}</td>
                  <td>{item.enrollDate}</td>
                  <td>{item.viewCount}</td>
                </tr>
              ))}
              </table>
            </div>
            
          <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onFirstPage={handleFirstPage}
                onPrevPage={handlePrevPage}
                onPageClick={handlePageClick}
                onNextPage={handleNextPage}
                onLastPage={handleLastPage}
            />
            </PageContent>
        </>
    )

}



export default Boards;


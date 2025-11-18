import { Pagination } from 'react-bootstrap';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 가져오고 상태를 업데이트합니다.
// useState를 사용하여 상태 변수를 선언합니다.

const Boards = () => {
    const [boardNo, setBoardNo] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        axios.get('http://localhost/boards?page=1')
             .then(response => {
                console.log(response.data.boardList[1]);
                setBoardNo(response.data.boardList[1].boardNo);
                setBoardTitle(response.data.boardList[1].boardTitle);
                setNickname(response.data.boardList[1].nickname);
    
const BoardList = ({ boards }) => {
  if (boards.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <div>
      {boards.map(boards => (
        <div key={boards.boardNo}>{boards.boardTitle}</div>
      ))}
    </div>
  );
}            
                    
       })
    }, []);
    

    return(
        
        <>
            <PageTitle 
                title="일반 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', current: true }
                ]} 
            />
            <div>
                {boardNo}
                {boardTitle}
                {nickname}
            </div>
            <PageContent>

            </PageContent>
        </>
    )
}



export default Boards;


import { useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BoardItems from '../Boards/components/BoardItems';
import { ButtonArea, ButtonGroup, LikeCard, ProfileAndLike } from '../../ActivityBoard/ActivityBoardDetail/ActivityBoardDetail.styles';
import OutlineSuccessButton from "../../Common/UI/Button/OutlineWriterButton.jsx";
import OutlineDangerButton from '../../Common/UI/Button/OutlineDangerButton';
import { FormCard } from '../../ActivityBoard/ActivityBoardInsertForm/ActivityBoardInsertForm.styles.js';
import { Form } from 'react-bootstrap';
import BoardReply from './BoardReply.jsx';
import RegionSelect from '../../ActivityBoard/ActivityBoardInsertForm/components/RegionSelect.jsx';

const BoardDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [board, setBoard] = useState([]);
    const [post, setPost] = useState([]);
    const [reply, setReply] = useState([]);
    const [regionNo, setRegionNo] = useState("");

    const handleUpdate = () => {
        navigate(`/boards/updateForm/${post.id}`);
  };

    const goList = () => {
        navigate("/boards");
  };

    // 좋아요
  const handleLikeToggle = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };


     useEffect(()=>{
        axios
            .get(`http://localhost/boards/detail/${id}`)
            .then((result) => {
                const response = result.data;
                console.log("상세보기 데이터:", response);
                setBoard({
                    title: response.boardDetail.boardTitle,
                    content: response.boardDetail.boardContent,
                    viewCount: response.boardDetail.viewCount,
                    regionNo: response.boardDetail.regionNo,
                    regionName: response.boardDetail.regionName,
                });
                console.log("댓글데이터 : ", response.replyList.length);
                setReply([
                    ...response.replyList]);
            })

    }, [id])
    
    return(
        <>
           
            <PageTitle 
                title="상세보기" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', path: '/boards' },
                    { label: '상세보기', current: true }
                ]} 
            />

            <PageContent>
                <FormCard style={{ padding: '50px' }}>
                <Form.Label /><strong>No : {id}</strong>
                    <div>조회수 : {board.viewCount}</div>
                
            <Form.Group className="mb-4">
              <Form.Label><strong>제목</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder={board.title}
                readOnly
              /> <br />

              <Form.Label><strong>내용</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder={board.content}
                maxLength={1000}
                readOnly
              />

            </Form.Group>

            <RegionSelect value={board.regionNo} onChange={setRegionNo}/>
            <BoardReply data={reply}/>


             <ProfileAndLike>

            {/* 좋아요 */}
            <LikeCard $liked={post.isLiked} onClick={handleLikeToggle}>
                <i className={post.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                {post.isLiked ? '좋아요 취소' : '좋아요'}
            </LikeCard>
            </ProfileAndLike>

            {/* 버튼 */}
            <ButtonArea>
                <OutlineSuccessButton onClick={goList}>목록으로</OutlineSuccessButton>
                <ButtonGroup>
                <OutlineSuccessButton onClick={handleUpdate}>수정</OutlineSuccessButton>
                <OutlineDangerButton>삭제</OutlineDangerButton>
                </ButtonGroup>
            </ButtonArea>

            {/* {댓글 리스트} */}
            </FormCard>
           

                
      
            </PageContent>
        </>

    )
}

export default BoardDetail;
import { useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ButtonArea, ProfileAndLike, LikeCard, ButtonGroup, Section, ReplyWriteArea } from '../../ActivityBoard/ActivityBoardDetail/ActivityBoardDetail.styles';
import OutlineSuccessButton from "../../Common/UI/Button/OutlineWriterButton.jsx";
import OutlineDangerButton from "../../Common/UI/Button/OutlineDangerButton.jsx";
import ReplyEditForm from '../../ActivityBoard/ActivityBoardDetail/components/ReplyEditForm';
import InputButton from '../../ActivityBoard/ActivityBoardDetail/components/InputButton';

const BoardDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [board, setBoardDetail] = useState([]);
    const [post, setPost] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    
     useEffect(()=>{
        axios
            .get(`http://localhost/boards/detail/${id}`)
            .then((result) => {
                const response = result.data;
                console.log(response);
                setBoardDetail(result.data.replyList);
            })

    }, [id])
    
    const handleUpdate = () => {
        navigate(`/boards/updateForm/${post.id}`);
  };

    const goList = () => {
        navigate("/boards");
  };

    // 공감 토글
    const handleLikeToggle = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

    const [comments] = useState([
    { id:1, nickname:"탄소아끼미", date:"2025.02.01", content:"대중교통 이용 멋져요! 👍" },
        // { id:1, writer:"d", date:"2025.02.01", content:"대중교통 이용 멋져요! 👍" },
  ]);

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
                
            <ProfileAndLike>

            {/* {좋아요 버튼}     */}
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

          {/* 댓글 리스트 */}
        <Section>
            <div style={{ width:"100%" }}>
              {comments.length === 0 ? (
                <div style={{ padding:"20px", textAlign:"center", color:"#777" }}>
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                </div>
                
              ) : (
                comments.map((reply) => (
                  <div key={reply.id} style={{
                    padding:"14px 10px",
                    borderBottom:"1px solid #eee",
                    fontSize:"14px"
                  }}>
                    <b>{reply.nickname}</b> · {reply.date}
                    <div style={{ marginTop:"6px" }}>{reply.content}</div>
                  </div>
                ))
              )}
            </div>
        </Section>

            <ReplyWriteArea>
            <ReplyEditForm style={{ flex: 1 }} />
            <InputButton />
          </ReplyWriteArea>
          
            </PageContent>
        </>

    )
}

export default BoardDetail;
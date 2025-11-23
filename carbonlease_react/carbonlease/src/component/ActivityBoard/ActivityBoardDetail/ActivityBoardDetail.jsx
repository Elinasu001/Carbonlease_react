import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx";
import PageContent from "../../Common/PageContent/PageContent.jsx";
import { Wrapper, ActivityInfo, ProfilAndLike, ButtonSection,CommentSection, LikeButton } from "./ActivityBoardDetail.styles.js";
import CommentInsert from "./components/CommentInsert.jsx";
import Comments from "./components/Comments.jsx";
import ImageSection from "./components/ImageSection.jsx";
import InfoSection from "./components/InfoSection.jsx";
import MapSection from "./components/MapSection.jsx";
import ProfilCard from "./components/ProfilCard.jsx";
import ContentSection from "./components/ContentSection.jsx";
import CommentsPagination from "./components/CommentsPagination.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchActivityDetail, toggleLike, deleteActivityBoard } from "../../../api/activity/activityAPI.js";
import { AuthContext } from "../../Context/AuthContext.jsx";
import Toast from "../../Common/Toast/Toast.jsx";
import activityStore from "../../../store/activityStore.js";


const ActivityBoardDetail = ({onShowToast}) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');

  // 토스트 메시지 표시
    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    // 토스트 메시지 닫기
    const handleCloseToast = () => {
        setShowToast(false);
    };

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      const res = await fetchActivityDetail(id, auth.accessToken);
      const data = res.data;

      const localLike = activityStore.getLike(id);

      setPost({
        ...data,
        isLiked: localLike ?? data.isLiked
      });

    } catch (err) {
      console.error("Detail조회 실패", err);
    } finally {
      setLoading(false);
    }
  };


  console.log(post);
  console.log(auth);
  if (loading) return <div>로딩중...</div>
  if (!post) return <div>게시글을 찾을수 없습니다.</div>

  const handleUpdate = () => {
    navigate(`/activityBoards/update/${id}`);
  };

  const handleDelete = async () => {
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteActivityBoard(id);
      alert("삭제되었습니다.");
      navigate("/activityBoards");
    } catch(err) {
      console.error("삭제 실패", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };


  const handleLikeToggle = async (e) => {
    e.stopPropagation();

    if (!auth.isAuthenticated) {
      handleShowToast("로그인이 필요합니다.", "error");
      return;
    }

    try {
      await toggleLike(post.activityNo);

      const newLikeStatus = !post.isLiked;

      activityStore.setLike(post.activityNo, newLikeStatus);

      setPost(prev => ({
        ...prev,
        isLiked: newLikeStatus,
        likeCount: newLikeStatus ? prev.likeCount + 1 : prev.likeCount - 1
      }));

      handleShowToast(
        newLikeStatus
          ? "이 활동에 공감해주셨어요!"
          : "공감을 취소했어요."
      );

    } catch (error) {
      handleShowToast("좋아요 처리에 실패했습니다.", "error");
      console.error(error);
    }
  };

  

  return (
    <>
      <PageTitle 
        title="인증 상세보기"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "인증게시판", path: "/ActivityBoards" },
          { label: "상세보기", current: true },
        ]}
      />

      <PageContent>
        <Wrapper>
          {/* 제목 + 등록정보 + 게시판 정보 */}
          <ActivityInfo>
            <InfoSection 
              title={post.activityTitle}
              writer={post.nickName}
              createDate={post.enrollDate}
              views={post.viewCount}
              likes={post.likeCount}
            />
          </ActivityInfo>
          
          {/* 이미지 */}
          <ImageSection images={post.images} />
          
          {/* 게시글 내용 */}
          
          <ContentSection content={post.activityContent} />
          
          {/* 지도 영역 */}
          <MapSection lat={post.lat} lng={post.lng}/>
          
          {/* 프로필 카드 + 좋아요 버튼 */}
          <ProfilAndLike>
            <ProfilCard 
              nickName={post.nickName}
              count={post.certificationCount}
              carbon={post.carbonSave}
            />
            {auth.isAuthenticated && (
              <LikeButton
                $liked={post.isLiked}
                onClick={handleLikeToggle}
                className="detail-like-btn"
              >
                <i className={post.isLiked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                좋아요
              </LikeButton>
            )}
          </ProfilAndLike>

          {/* 수정/삭제 버튼 */}
          {auth.isAuthenticated && auth.nickName === post.nickName && (
            <ButtonSection>
              <button className="update-btn" onClick={handleUpdate}>수정</button>
              <button className="delete-btn" onClick={handleDelete}>삭제</button>
            </ButtonSection>
          )}


          {/* 댓글 영역 */}
          <CommentSection>
            <Comments />
            <CommentInsert />
          </CommentSection>

          {/* 댓글 페이징 */}
          <CommentsPagination />

          <button onClick={() => navigate("/activityBoards")}>목록으로</button>
        </Wrapper>
      </PageContent>
      <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={handleCloseToast}
          variant={toastVariant}
      />
    </>
  );
};

export default ActivityBoardDetail;

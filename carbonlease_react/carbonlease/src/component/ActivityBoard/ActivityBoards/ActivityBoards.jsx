import { useNavigate } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import Pagination from '../Pagination/Pagination';
import { ButtonAndSearch } from './ActivityBoards.styles';
import BoardsList from './components/BoardsList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import { useActivityBoards } from './hooks/useActivityBoards';
import SkeletonBoardsList from './components/SkeletonBoardsList';

const ActivityBoards = () => {

    const navigate = useNavigate();
    
    const {
        activityBoards,
        filter,
        setFilter,
        currentPage,
        setCurrentPage,
        pageInfo,
        handleSearch,
        loading,
        setLoading
    } = useActivityBoards();

    return (
        <>
            <PageTitle 
                title="인증 게시판"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판', current: true }
                ]}
            />

            <PageContent>

                {/* 로딩 중일 때 최우선 */}
                {loading ? (
                <SkeletonBoardsList />
                    ) : (
                    <>
                        {/* 로딩 끝났고 + 데이터 없음 */}
                        {activityBoards.length === 0 ? (
                        <EmptyState message="검색된 게시글이 없습니다." />
                        ) : (
                        <BoardsList 
                            boards={activityBoards}
                            onClickItem={(id) => navigate(`/activityBoards/${id}`)}
                        />
                        )}
                    </>
                )}
               
                <ButtonAndSearch>
                    <button 
                        onClick={() => {
                            const token = localStorage.getItem("accessToken");
                            if (!token){
                                alert("로그인 후 이용해주세요!");
                                navigate("/login");
                                return;
                            }
                            navigate("/activityBoards/insert");
                        }}>글쓰기</button>
                    <SearchBar
                        filter={filter}
                        setFilter={setFilter}
                        onSearch={handleSearch}
                    />
                </ButtonAndSearch>

                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageInfo={pageInfo}
                />

            </PageContent>
        </>
    );
};

export default ActivityBoards;

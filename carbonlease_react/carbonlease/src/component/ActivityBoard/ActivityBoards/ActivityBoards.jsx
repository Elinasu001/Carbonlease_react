import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import BoardItem from './components/BoardItem';
import OutlineWriterButton from '../../Common/UI/Button/OutlineWriterButton';
import SearchFilterDropdowns from './components/SearchFilterDropdowns';
import SearchBox from './components/SearchBox';
import Pagination from '../../Common/Pagination/Pagination';

const ActivityBoards = () => {

    const navigate = useNavigate();

    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(0);  // backend는 0-based

    // Pagination.jsx 요구 형식에 맞게 totalPage 추가
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    const [filter, setFilter] = useState('title');
    const [keyword, setKeyword] = useState('');

    const token = localStorage.getItem("accessToken");

    const fetchBoards = async () => {
        try {
            const res = await axios.get(
                `http://localhost:80/activityBoards?page=${page}&filter=${filter}&keyword=${keyword}`,
                { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
            );

            setBoards(res.data.list);

            // Pagination 전용 totalPage 세팅 (maxPage를 totalPage로 매핑)
            setPageInfo({
                startPage: res.data.pageInfo.startPage,
                endPage: res.data.pageInfo.endPage,
                totalPage: res.data.pageInfo.maxPage
            });

        } catch (err) {
            console.error("게시글 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [page, filter, keyword]);

    // Pagination.jsx에서 사용하는 setter
    const handleSetCurrentPage = (newPage) => {
        // newPage는 1-based → backend는 0-based
        setPage(newPage - 1);
    };

    const goWritePage = () => navigate("/activityBoards/insertForm");

    const handleSelectFilter = (value) => setFilter(value);

    const handleSearch = (value) => {
        setPage(0);
        setKeyword(value);
    };

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

                {/* 게시글 리스트 */}
                <div style={{ width:"1200px", margin:"0 auto", padding:"40px 0" }}>
                    {boards.length > 0 ? (
                        boards.map((item, idx) => (
                            <BoardItem
                                key={idx}
                                item={item}
                                onClick={() => navigate(`/activityBoards/${item.activityNo}`)}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign:"center", color:"#777", padding:"40px 0" }}>
                            게시글이 없습니다.
                        </div>
                    )}
                </div>

                {/* 버튼 + 검색 */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <OutlineWriterButton onClick={goWritePage}>
                        글쓰기
                    </OutlineWriterButton>
                    <div style={{ display:"flex", gap:"10px" }}>
                        <SearchFilterDropdowns onSelectFilter={handleSelectFilter} />
                        <SearchBox filter={filter} onSearch={handleSearch} />
                    </div>
                </div>

                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
                    <Pagination
                        currentPage={page + 1}        // 1-based
                        setCurrentPage={handleSetCurrentPage}
                        pageInfo={pageInfo}           // totalPage 포함되어 있음
                    />
                </div>

            </PageContent>
        </>
    );
};

export default ActivityBoards;

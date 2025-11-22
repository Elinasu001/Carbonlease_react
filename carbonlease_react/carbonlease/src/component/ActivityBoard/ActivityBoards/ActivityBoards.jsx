import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import Pagination from '../../Common/Pagination/Pagination';
import { ButtonAndSearch } from './ActivityBoards.styles';
import BoardsList from './components/BoardsList';
import SearchBar from './components/SearchBar';
import { fetchActivityBoards } from '../../../api/activity/activityAPI';


const ActivityBoards = () => {

    const navigate = useNavigate();
    const [activityBoards, setActivityBoards] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState("title");
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    const loadBoards = (page, searchFilter, serachKeyword) => {
        fetchActivityBoards(page, searchFilter, serachKeyword)
            .then(res => {
                const list = res.data.activityListDTO || [];

                setActivityBoards(list);

                setPageInfo({
                    startPage: res.data.pageInfo.startPage,
                    endPage: res.data.pageInfo.endPage,
                    totalPage: res.data.pageInfo.maxPage
                });
            })
            .catch(e => console.error(e));
    };

    useEffect(() => {
        loadBoards(currentPage, filter, keyword);
    }, [currentPage]);

    const handleSearch = (value) => {
        setKeyword(value);
        setCurrentPage(1);

        loadBoards(1, filter, value);
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
                
                <BoardsList 
                    boards={activityBoards}
                    onClickItem={(id) => navigate(`/activityBoards/${id}`)}
                />
               
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

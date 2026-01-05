import { useEffect, useState } from 'react';
import { getAllCountTop5 } from '../../../../api/dashboard/adminDashBoardApi';

function convertTop5StatsToList(stats) {
    // API 응답이 대문자 키로 올 경우 소문자 별칭으로 변환
    return stats.map(item => ({
        boardTitle: item.boardTitle,
        viewCount: item.viewCount,
        boardType: item.boardType,
    }));
}

const useTop5RankingList = (onShowToast) => {
    const [top5List, setTop5List] = useState([]);
    const [loading, setLoading] = useState(true);


    // ===== 인기 Top5 불러오기 =====
    const getTop5List = async () => {
        setLoading(true);
        try {
            const res = await getAllCountTop5();
            if(res.status === 200) {
                console.log(res?.data?.message);
                console.log('인기 Top5 목록 데이터 :', res.data.data);
                setTop5List(convertTop5StatsToList(res.data.data));
            }
            
        } catch (err) {
            onShowToast(err?.response?.data?.message || '인기 Top5 목록을 불러오지 못했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };


    // ===== 마운트 시 데이터 로드 =====
    useEffect(() => {
        getTop5List();
    }, []);

    return {
        top5List,
        loading,
        getTop5List,
    };
};

export default useTop5RankingList;
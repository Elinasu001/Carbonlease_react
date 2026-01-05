import { useEffect, useState } from 'react';
import { deleteByIdApi, findAllApi, hideByIdApi, restoreByIdApi } from '../../../../api/campaign/adminCampaignApi';


const useAdminCampaign = (onShowToast) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });


    useEffect(() => {
        getCampaigns(currentPage, status, keyword);
    }, [currentPage, status, keyword]);

    // 캠페인 목록 불러오기 
    const getCampaigns = async (pageNo, status, keyword) => {
        setLoading(true);
        try {
            const res = await findAllApi(pageNo, status, keyword);
            if (res && res.status === 200) {
                console.log(res?.data?.message);
                console.log('캠페인 목록 응답 데이터:', res.data.data);
                const { campaigns, pageInfo } = res.data.data;
                setCampaigns([...campaigns]);
                setPageInfo({
                    startPage: pageInfo.startPage,
                    endPage: pageInfo.endPage,
                    totalPage: pageInfo.maxPage
                });
            }
        } catch (err) {
            onShowToast(err?.response?.data?.message || '캠페인 목록을 불러오지 못했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };


    // 숨김 함수 추가
    const hideCampaign = async (id, callback) => {
        setLoading(true);
        try {
            const res = await hideByIdApi(id);
            if (res && res.status === 200) {
                // await getCampaigns(currentPage); // 응답을 받자마자 목록 전체를 새로고침(getCampaigns) 하지 않고, 메모리에 있는 데이터만 슥 수정 (setCampaigns)
                console.log(res?.data?.message);
                console.log('캠페인 숨김 응답 데이터:', res.data.data);
                setCampaigns(prev =>
                    prev.map(item =>
                        // status를 'N'으로, displayStatus를 '숨김'으로 동시에 변경
                        item.campaignNo === id 
                            ? { ...item, status: 'N', displayStatus: '숨김' }
                            : item
                    )
                );
                onShowToast(res?.data?.message || '숨김처리되었습니다!', 'success');
                if (callback) callback();
            }
        } catch (error) {
            onShowToast(error?.response?.data?.message || '숨김처리에 실패했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };


    // 복구 함수 추가
    const restoreCampaign = async (id, callback) => {
        setLoading(true);
        try {
            const res = await restoreByIdApi(id);
            if (res && res.status === 200) {
                // await getCampaigns(currentPage); // 서버에 물어보고 처음부터 다시 다 받아오기
                setCampaigns(prev =>
                    prev.map(item =>
                        //  status를 'Y'로, displayStatus를 '정상'으로 변경
                        item.campaignNo === id 
                            ? { ...item, status: 'Y', displayStatus: '정상' }
                            : item
                    )
                );
                onShowToast('복구되었습니다!', 'success');
                if (callback) callback();
            }
        } catch (error) {
            onShowToast(
                error?.response?.data?.["error-message"] || '복구에 실패했습니다.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };


    // 완전 삭제 함수 추가
    const deleteCampaign = async (id, callback) => {
        setLoading(true);
        try {
            const res = await deleteByIdApi(id);
            if (res.status === 200 || res.status === 204) {
                console.log(res?.data?.message);
                console.log('캠페인 삭제 응답 데이터:', res.data);
                await getCampaigns(currentPage); // 목록 새로고침
                onShowToast(res?.data?.message || '게시글이 삭제되었습니다.', 'success');
                if (callback) callback();
            }
        } catch (err) {
            onShowToast(err?.response?.data?.message || '삭제에 실패했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        campaigns,
        currentPage,
        setCurrentPage,
        status,
        setStatus,
        keyword,
        setKeyword,
        loading,
        pageInfo,
        hideCampaign,
        restoreCampaign,
        deleteCampaign,
        getCampaigns,
    };
};

export default useAdminCampaign;
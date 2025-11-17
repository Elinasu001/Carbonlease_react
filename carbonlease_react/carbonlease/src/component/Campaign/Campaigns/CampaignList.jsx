import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCampaignList, toggleCampaignLike } from '../../../api/campaign/campaignApi';
import Pagination from '../../Common/Pagination/Pagination';
import {
    CampaignCard,
    CampaignCategory,
    CampaignContent,
    CampaignDate,
    CampaignDescription,
    CampaignGrid,
    CampaignImage,
    CampaignInfo,
    CampaignListContainer,
    CampaignTitle,
    LikeButton,
    ParticipantCount
} from './CampaignList.styled';
import CampaignSkeleton from './CampaignSkeleton';

function CampaignList({ onShowToast }) {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 실제 로그인 로직에 맞게 수정

    useEffect(() => {
        fetchCampaigns(currentPage);
    }, [currentPage]);

    const fetchCampaigns = (page) => {
        setLoading(true);
        getCampaignList(page, 6)
            .then(response => {
                const { campaigns, pageInfo } = response.data;
                    console.log('[캠페인 리스트]', campaigns);
                    console.log('[캠페인 개수]', campaigns.length);
                setCampaigns(campaigns);
                setTotalPages(pageInfo.maxPage);
                // pageNumbers는 백엔드에서 받은 startPage~endPage로만 생성
                const pageNumbers = [];
                for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
                    pageNumbers.push(i);
                }
                setPageNumbers(pageNumbers);
            })
            .catch(error => {
                console.error('캠페인 목록을 불러오는데 실패했습니다:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLikeToggle = (e, campaignId, currentLikeStatus) => {
        e.stopPropagation();
        toggleCampaignLike(campaignId)
            .then(() => {
                setCampaigns(prevCampaigns =>
                    prevCampaigns.map(campaign =>
                        campaign.campaignNo === campaignId
                            ? { ...campaign, isLiked: !campaign.isLiked }
                            : campaign
                    )
                );
                if (!currentLikeStatus) {
                    onShowToast('이 캠페인에 공감해주셨어요!');
                } else {
                    onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
                }
            })
            .catch(error => {
                console.error('좋아요 처리에 실패했습니다:', error);
                if (error.response?.status === 401) {
                    onShowToast('로그인이 필요합니다.', 'error');
                } else {
                    onShowToast('좋아요 처리에 실패했습니다.', 'error');
                }
            });
    };

    const handleCardClick = (campaignId) => {
        navigate(`/campaigns/detail/${campaignId}`);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const handleLastPage = () => {
        setCurrentPage(totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}.${date.getDate()}`;
    };

    if (loading) {
        return (
            <CampaignListContainer>
                <CampaignSkeleton count={6} />
            </CampaignListContainer>
        );
    }
    if (!campaigns || campaigns.length === 0) {
        return null;
    }
    return (
        <CampaignListContainer>
            <CampaignGrid>
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.campaignNo} onClick={() => handleCardClick(campaign.campaignNo)}>
                        <CampaignImage>
                            <img src={campaign.imageUrl} alt={campaign.campaignTitle} />
                            {isLoggedIn && (
                                <LikeButton
                                    $liked={campaign.isLiked}
                                    onClick={(e) => handleLikeToggle(e, campaign.campaignNo, campaign.isLiked)}
                                >
                                    <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                                </LikeButton>
                            )}
                        </CampaignImage>
                        <CampaignContent>
                            <CampaignCategory>{campaign.category?.categoryName || '카테고리 없음'}</CampaignCategory>
                            <CampaignTitle>{campaign.campaignTitle}</CampaignTitle>
                            <CampaignDescription>{campaign.campaignContent}</CampaignDescription>
                            <CampaignInfo>
                                <ParticipantCount>
                                    <i className="bi bi-people-fill"></i>
                                    <span>{(campaign.viewCount || 0).toLocaleString()}명 참여</span>
                                </ParticipantCount>
                                <CampaignDate>
                                    <i className="bi bi-calendar-check"></i>
                                    <span>{formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}</span>
                                </CampaignDate>
                            </CampaignInfo>
                        </CampaignContent>
                    </CampaignCard>
                ))}
            </CampaignGrid>
            {campaigns.length > 0 && (
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
            )}
        </CampaignListContainer>
    );
}

export default CampaignList;

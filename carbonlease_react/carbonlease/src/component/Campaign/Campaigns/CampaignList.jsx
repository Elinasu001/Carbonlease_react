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
    EmptyContainer,
    LikeButton,
    ParticipantCount
} from './CampaignList.styled';
import CampaignSkeleton from './CampaignSkeleton';

function CampaignList({ onShowToast }) {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCampaigns(currentPage);
    }, [currentPage]);

    const fetchCampaigns = (page) => {
        setLoading(true);
        getCampaignList(page, 6)
            .then(response => {
                setCampaigns(response.campaigns);
                setTotalPages(response.totalPages);
            })
            .catch(error => {
                console.error('캠페인 목록을 불러오는데 실패했습니다:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLikeToggle = (e, campaignId, currentLikeStatus) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지
        
        // 즉시 UI 업데이트 (Optimistic Update)
        setCampaigns(prevCampaigns =>
            prevCampaigns.map(campaign =>
                campaign.id === campaignId
                    ? { ...campaign, isLiked: !campaign.isLiked }
                    : campaign
            )
        );

        // 토스트 메시지 즉시 표시
        if (!currentLikeStatus) {
            onShowToast('이 캠페인에 공감해주셨어요!');
        } else {
            onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
        }

        // 백그라운드에서 API 호출
        toggleCampaignLike(campaignId)
            .then(() => {
                // 성공 시 추가 작업 (필요시)
            })
            .catch(error => {
                console.error('좋아요 처리에 실패했습니다:', error);
                // 실패 시 원래 상태로 되돌림
                setCampaigns(prevCampaigns =>
                    prevCampaigns.map(campaign =>
                        campaign.id === campaignId
                            ? { ...campaign, isLiked: currentLikeStatus }
                            : campaign
                    )
                );
                onShowToast('좋아요 처리에 실패했습니다.', 'error');
            });
    };

    const handleCardClick = (campaignId) => {
        navigate(`/campaigns/detail/${campaignId}`);
    };

    const updatePageNumbers = (page, total) => {
        const maxVisible = 5;
        const blockNumber = Math.ceil(page / maxVisible);
        const start = (blockNumber - 1) * maxVisible + 1;
        const end = Math.min(blockNumber * maxVisible, total);
        
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        updatePageNumbers(1, totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        updatePageNumbers(page, totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
        updatePageNumbers(totalPages, totalPages);
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

    if (campaigns.length === 0) {
        return (
            <EmptyContainer>
                <i className="bi bi-inbox"></i>
                <p>등록된 캠페인이 없습니다.</p>
            </EmptyContainer>
        );
    }

    return (
        <CampaignListContainer>
            <CampaignGrid>
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} onClick={() => handleCardClick(campaign.id)}>
                        <CampaignImage>
                            <img src={campaign.imageUrl} alt={campaign.title} />
                            <LikeButton
                                $liked={campaign.isLiked}
                                onClick={(e) => handleLikeToggle(e, campaign.id, campaign.isLiked)}
                            >
                                <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                            </LikeButton>
                        </CampaignImage>
                        <CampaignContent>
                            <CampaignCategory>{campaign.category}</CampaignCategory>
                            <CampaignTitle>{campaign.title}</CampaignTitle>
                            <CampaignDescription>{campaign.description}</CampaignDescription>
                            <CampaignInfo>
                                <ParticipantCount>
                                    <i className="bi bi-people-fill"></i>
                                    <span>{campaign.participantCount.toLocaleString()}명 참여</span>
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
        </CampaignListContainer>
    );
}

export default CampaignList;

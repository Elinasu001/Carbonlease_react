import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCampaignDetail, toggleCampaignLike } from '../../../api/campaign/campaignApi';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import Loading from '../../Common/Loading/Loading';
import PageContent from '../../Common/PageContent/PageContent';
import Toast from '../../Common/Toast/Toast';
import {
    ActionButtons,
    BackButton,
    CampaignDetailContainer,
    CategoryBadge,
    Content,
    ErrorContainer,
    ImageWrapper,
    LikeButton,
    MetaInfo,
    MetaItem,
    Title
} from './CampaignDetail.styled';

const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

    useEffect(() => {
        fetchCampaignDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchCampaignDetail = () => {
        setLoading(true);
        setError(false);
        getCampaignDetail(id)
            .then(data => {
                setCampaign(data);
            })
            .catch(error => {
                console.error('캠페인 상세 조회 실패:', error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLikeToggle = () => {
        if (!campaign) return;

        const prevLikeStatus = campaign.isLiked;

        // Optimistic Update
        setCampaign(prev => ({
            ...prev,
            isLiked: !prev.isLiked,
            participantCount: prev.isLiked
                ? prev.participantCount - 1
                : prev.participantCount + 1
        }));

        // 토스트 메시지
        if (!prevLikeStatus) {
            showToastMessage('이 캠페인에 공감해주셨어요!', 'success');
        } else {
            showToastMessage('참여를 취소했어요. 언제든 다시 함께해주세요!', 'info');
        }

        // API 호출
        toggleCampaignLike(id)
            .then(() => {
                // 성공 시 추가 작업 (필요시)
            })
            .catch(error => {
                console.error('좋아요 처리 실패:', error);
                // 실패 시 원래 상태로 복구
                setCampaign(prev => ({
                    ...prev,
                    isLiked: prevLikeStatus,
                    participantCount: prevLikeStatus
                        ? prev.participantCount + 1
                        : prev.participantCount - 1
                }));
                showToastMessage('좋아요 처리에 실패했습니다.', 'error');
            });
    };

    const showToastMessage = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleBack = () => {
        navigate('/campaigns');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <>
                <PageTitle
                    title="캠페인 상세보기"
                    breadcrumbs={[
                        { label: 'Home', path: '/' },
                        { label: '캠페인', path: '/campaigns' },
                        { label: '상세보기', current: true }
                    ]}
                />
                <PageContent>
                    <Loading message="캠페인 정보를 불러오는 중..." />
                </PageContent>
            </>
        );
    }

    if (error || !campaign) {
        return (
            <>
                <PageTitle
                    title="캠페인 상세보기"
                    breadcrumbs={[
                        { label: 'Home', path: '/' },
                        { label: '캠페인', path: '/campaigns' },
                        { label: '상세보기', current: true }
                    ]}
                />
                <PageContent>
                    <ErrorContainer>
                        <i className="bi bi-exclamation-triangle"></i>
                        <p>캠페인을 찾을 수 없습니다.</p>
                        <BackButton onClick={handleBack}>
                            <i className="bi bi-arrow-left"></i>
                            목록으로 돌아가기
                        </BackButton>
                    </ErrorContainer>
                </PageContent>
            </>
        );
    }

    return(
        <>
            <PageTitle
                title="캠페인 상세보기"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '캠페인', path: '/campaigns' },
                    { label: '상세보기', current: true }
                ]}
            />
            <PageContent>
                <CampaignDetailContainer>
                    <CategoryBadge>{campaign.category}</CategoryBadge>
                    <Title>{campaign.title}</Title>
                    
                    <MetaInfo>
                        <MetaItem>
                            <i className="bi bi-calendar-check"></i>
                            <span>
                                {formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}
                            </span>
                        </MetaItem>
                        <MetaItem>
                            <i className="bi bi-people-fill"></i>
                            <strong>{campaign.participantCount.toLocaleString()}명</strong> 참여
                        </MetaItem>
                        <MetaItem>
                            <i className="bi bi-heart-fill"></i>
                            <span>{campaign.isLiked ? '공감함' : '공감하기'}</span>
                        </MetaItem>
                    </MetaInfo>

                    {campaign.detailImageUrl && (
                        <ImageWrapper>
                            <img src={campaign.detailImageUrl} alt={campaign.title} />
                        </ImageWrapper>
                    )}

                    <Content>{campaign.content || campaign.description}</Content>

                    <ActionButtons>
                        <BackButton onClick={handleBack}>
                            <i className="bi bi-list-ul"></i>
                            목록보기
                        </BackButton>
                        <LikeButton
                            $liked={campaign.isLiked}
                            onClick={handleLikeToggle}
                        >
                            <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                            {campaign.isLiked ? '공감 취소' : '공감하기'}
                        </LikeButton>
                    </ActionButtons>
                </CampaignDetailContainer>
            </PageContent>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                variant={toastVariant}
            />
        </>
    )
}

export default CampaignDetail;
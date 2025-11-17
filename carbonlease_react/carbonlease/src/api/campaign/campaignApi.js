import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

// Axios 인스턴스 생성
const campaignApi = axios.create({
    baseURL: `${API_BASE_URL}/campaigns`,
    timeout: 10000,
    withCredentials: true, // 쿠키(세션) 전송을 위해 추가
    headers: {
        'Content-Type': 'application/json',
    }
});

// 캠페인 리스트 조회
export const getCampaignList = (page = 1, size = 12) => {
    return campaignApi.get('', {
        params: { page, size }
    });
};

// 캠페인 좋아요 토글
export const toggleCampaignLike = (campaignId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject(new Error('No token found'));
    }
    return campaignApi.post(`/${campaignId}/like`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// 캠페인 상세 조회
export const getCampaignDetail = (campaignId) => {
    return campaignApi.get(`/${campaignId}`);
};

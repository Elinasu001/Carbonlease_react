
import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const adminCampaignApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/campaigns`,
    timeout: 10000
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
adminCampaignApi.interceptors.request.use(
    
    (config) => {
        // 저장소에서 토큰을 꺼냅니다 (localStorage 예시)
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);

// 캠페인 리스트 조회
export const findAll = (page) => {
    return adminCampaignApi.get('', {
        params: { pageNo : page }
    });
};

// 캠페인 게시글 등록
export const save = (campaign, files) => {
    const formData = new FormData();

    Object.entries(campaign).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // 파일 추가
    if (files && files.length > 0) {
        formData.append("thumbnail", files[0]);
        formData.append("detailImage", files[1]);
    }

    return adminCampaignApi.post('/insert', formData);
};


// 카테고리 목록 조회
export const getCategories = () => {
    return adminCampaignApi.get('/categories');
};





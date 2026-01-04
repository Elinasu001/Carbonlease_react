
/**
 * 환경 변수 설정
 * 1. 우선순위: window.ENV (Docker/Runtime 주입) > import.meta.env (Vite 빌드 주입)
 * 2. 이유: 빌드된 이미지를 수정 없이 다양한 환경(Dev, Prod)에서 재사용하기 위함
 */
export const API_BASE_URL = window.ENV?.API_URL || import.meta.env.VITE_API_URL || "http://localhost:8080";
export const WS_BASE_URL = window.ENV?.WS_URL || import.meta.env.VITE_WS_URL || "http://localhost:8080/ws-stomp";
export const KAKAO_REDIRECT_URI = window.ENV?.KAKAO_REDIRECT_URI || import.meta.env.VITE_KAKAO_REDIRECT_URI || "";
export const KAKAO_MAP_API_KEY = window.ENV?.KAKAO_MAP_API_KEY || import.meta.env.VITE_KAKAO_MAP_API_KEY || "";
export const KAKAO_CLIENT_ID = window.ENV?.KAKAO_CLIENT_ID || import.meta.env.VITE_KAKAO_CLIENT_ID || "";

import axios from 'axios';

// 공통 Axios 인스턴스 생성 함수 (인터셉터 포함)
export function createApiInstance(baseURL) {
    const instance = axios.create({
        baseURL: baseURL,
    });

    // 요청 인터셉터: 모든 요청에 JWT 토큰 자동 부착
    instance.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 응답 인터셉터: 에러 공통 처리 (예: 토큰 만료 등)
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.warn('인증이 만료되었습니다. 다시 로그인해주세요.');
                // 필요 시 로그아웃 처리 로직 추가
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

// 기본 인스턴스 내보내기
export const api = createApiInstance(API_BASE_URL);

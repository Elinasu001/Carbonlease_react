/**
 * 환경변수 통합 관리
 * 
 * 우선순위:
 * 1. window.ENV (front/config.js)
 * 2. import.meta.env (.env 파일)
 * 3. 기본값
 */

export const API_BASE_URL = 
    window.ENV?.API_URL || 
    import.meta.env.VITE_API_URL || 
    "http://localhost:8080";

export const WS_BASE_URL = 
    window.ENV?.WS_URL || 
    import.meta.env.VITE_WS_URL || 
    "http://localhost:8080/ws-stomp";

// 전체 config
export const config = {
    API_URL: API_BASE_URL,
    WS_URL: WS_BASE_URL,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD
};


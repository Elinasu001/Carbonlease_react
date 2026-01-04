/**
 * 접속한 환경이 도메인이든, IP 주소든 상관없이
 * 현재 브라우저의 주소창 정보를 기반으로 서버 주소를 자동 조립
 */
const { hostname, protocol: currentProtocol, port } = window.location;

// 1. 개발 환경 여부 확인
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

// 2. 서버 베이스 주소 자동 결정
const serverBase = isLocal
    ? `http://localhost:8080`
    : `${currentProtocol}//${hostname}${port ? `:${port}` : ""}`;
    // 운영 환경(sh-pk.store 또는 IP): 브라우저 주소창 주소를 그대로 사용

window.ENV = {
    API_URL: serverBase,
    WS_URL: `${serverBase}/ws-stomp`,

    KAKAO_REDIRECT_URI: `${serverBase}/kakao/callback`,
    KAKAO_MAP_API_KEY: "7317ce02b514818da5c2a34210dc75ac",
    KAKAO_CLIENT_ID: "6caaa3a7fb9c9fd967792899e6949126"
};
import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react'; // useRef 추가
import SockJS from 'sockjs-client';
import { WS_BASE_URL } from '../api/api.js';


/**
 * 실시간 이벤트 수신을 위한 웹소켓 커스텀 훅
 * @param onEventMessage - 서버에서 메시지를 받았을 때 실행할 함수
 */
export function useEventSocket(onEventMessage) {

    // 1. 최신 콜백 함수를 안전하게 보관하는 Ref 생성 (닫히지 않는 보관함)
    const messageHandlerRef = useRef(onEventMessage);

    // 2. 부모 컴포넌트가 리렌더링되어 onEventMessage 함수가 새로 생성될 때마다 업데이트
    // (함수 주소값만 Ref에 동기화해주며, 웹소켓 연결에는 전혀 영향을 주지 않음)
    useEffect(() => {
        messageHandlerRef.current = onEventMessage;
    }, [onEventMessage]);

    // 3. 웹소켓 연결 및 구독
    useEffect(() => {

        //console.log(" 웹소켓 최초 연결 시도...");
        // SockJS와 STOMP 클라이언트 초기 설정
        const socket = new SockJS(WS_BASE_URL);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000, // 연결이 끊겼을 때 5초마다 자동 재연결 시도
            onConnect: () => {
                //console.log("웹소켓 연결 성공!");

                // 특정 채널(/sub/event/main)을 구독하여 서버 메시지 대기
                stompClient.subscribe('/sub/event/main', (message) => {
                    if (message.body) {
                        const eventData = JSON.parse(message.body);
                        // 메시지가 왔을 때, Ref 보관함에 들어있는 '가장 최신 버전'의 함수를 꺼내 호출
                        // 이를 통해 소켓 재연결 없이도 최신 상태(State)에 접근
                        messageHandlerRef.current(eventData);
                    }
                });
            },
        });

        // 웹소켓 활성화 (실제 연결 시작)
        stompClient.activate();

        // 4. 클린업(Cleanup) 함수: 컴포넌트가 소멸할 때 실행
        // 사용자가 이 페이지를 완전히 떠날 때만 실행되어 웹소켓 연결을 깔끔하게 닫는다.
        return () => {
            console.log(" 웹소켓 연결 해제");
            stompClient.deactivate();
        };
    
    // 의존성 배열을 [] 빈 배열로 설정하여 페이지 로드 시 '단 한 번'만 연결되도록 고정
    // 이로 인해 중복 연결이나 리렌더링 시 발생하는 DISCONNECT 문제를 원천 봉쇄
    }, []);

}
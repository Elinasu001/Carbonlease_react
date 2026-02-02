> # 프로젝트명 : Carbonlease ( 탄소 절약 인증 플랫폼 )

### 한 줄 소개
* 탄소 절약 활동을 기록·공유하고, 캠페인 및 공지사항을 통해 친환경 활동을 장려하는 웹 서비스입니다.

> ## 메인 화면

<img width="1216" height="771" alt="메인1" src="https://github.com/user-attachments/assets/6fa7f362-c375-49de-8b9f-dd542da0bd24" />

> ## 프로젝트 소개

&nbsp; 이 프로젝트는 Spring Boot & React 기반의 웹 서비스로,
CRUD, JWT 기반 인증, REST API, 파일 업로드, 공공데이터 API  <br />
활용, 관리자 기능 웹 개발의 전반적인 기능을 구현하고 학습하는 것을 목표로 하였습니다.

> ## 개발 기간

* 2025.11.10 ~ 2025.12.10 (약 4주)
* 개발 인원 총 5명

> ## 주요 기능

* ### 메인 ###
  * 지역별 전력 사용량 데이터를 가져와 버블맵으로 시각화
  * useRegionStatsMap 훅에서 지도 상태·버블 크기·Tooltip·Loading 등을 통합 관리
  * RegionStatsMap.jsx에서 SVG 지도 렌더링 및 버블 표시
  * 지역 클릭/호버 등 인터렉션 처리로 직관적인 전력 사용량 탐색 제공

* ### 회원 관리 ###
  * 회원가입 / 로그인 (JWT 인증)
  * 토큰 기반 권한 부여 (일반 사용자 / 관리자)
  * 정보 수정 및 탈퇴
  * 카카오 주소 검색 API를 이용한 주소 입력
  * AccessToken & RefreshToken 관리

* ### 일반 게시판 ###
  * 조회수 / 좋아요 카운트
  * 기본 CRUD
  * 페이징 처리

* ### 인증 게시판 ###
  * 사진 업로드
  * 조회수 / 좋아요 카운트
  * 댓글 CRUD
  * 지도 기반 좌표 저장
  * 썸네일 이미지 처리
  * 페이징 처리

* ### 공지사항 게시판 ###
  * 공지 등록 / 수정 / 삭제
  * 상세 조회 및 목록 페이징
  * 캘린더 API를 이용한 일정 관리
 
*  ### 캠페인 ###
   * 캠페인 생성 / 수정 / 삭제
   * 캠페인 상태 (진행 / 종료 / 삭제) 표시
   * 좋아요 기능

* ### 실시간 대기오염 정보 제공 ###
  * 공공데이터 API 연동
  * 지역·시도별 실시간 대기질 조회
  * 캐싱 및 Rate-limit을 통한 요청 최소화
 
* ### 관리자 페이지 ###
  * 게시글 숨김 / 복구 / 삭제
  * 사용자 상태 관리
  * 공지사항 및 캠페인 등록 및 수정
  * 모든 게시판 관리
  * ROLE_ADMIN 전용 기능
 
> ## 기술 스택
### Frontend
* React
* Node.js
* Bootstrap
* Styled-Components
* Axios

> ## 프로젝트 구조

<img width="214" height="509" alt="프로젝트 구조" src="https://github.com/user-attachments/assets/5d79443c-86f4-4df1-8dac-773868dbf9f6" />

> ## 주요 트러블 슈팅


> ## 배운점

> ### 박수현
  * KEPCO API 활용한 전국 월별 전력 사용량 시각화(지도 버블맵)
  * Websocket 이벤트 참여하기
  * 캠페인 CRUD
  * 캠페인 관리자
  * 좋아요 기능
  * 댓글 기능
  * 검색 기능
  * 대시보드
  * 공통 (Alert / Modal / Form / Toast / Header(Router)) 

>

> ## 개선 사항

> ### 박수현
* 내용

> ## 팀원 정보


| 이름 | 담당 | GitHub |
|------|------------------------|------------------------------|
| 박수현 (팀장) | 메인페이지 & 캠페인 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/Elinasu001) &nbsp; https://github.com/Elinasu001 |
| 백준걸 | 인증게시판 & 사이드바 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/ajungeul93-rgb) &nbsp; https://github.com/ajungeul93-rgb|
| 최준영 | 공지사항 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/cjysy0104) &nbsp;https://github.com/cjysy0104|
| 현금자 | 일반게시판 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/yoonja486) &nbsp;https://github.com/yoonja486|
| 박세혁 | 회원관리 & 로그인 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/Rostreaca) &nbsp;https://github.com/Rostreaca|

> ## 문의
* Email : elinasu001@gmail.com
* GitHub Issues 활용

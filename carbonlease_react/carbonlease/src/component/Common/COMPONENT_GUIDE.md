# 공통 컴포넌트 사용 가이드

부트스트랩 기반으로 제작된 공통 UI 컴포넌트입니다.

## 컴포넌트 목록

### 1. Toast (자동 알림)
3초 후 자동으로 사라지는 알림 메시지

**위치**: `src/component/Common/Toast/`

**사용법**:
```jsx
import { useState } from 'react';
import Toast from './component/Common/Toast/Toast';

function MyComponent() {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    return (
        <>
            <button onClick={() => handleShowToast('성공!', 'success')}>
                성공 알림
            </button>
            
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                variant={toastVariant}
            />
        </>
    );
}
```

**Props**:
- `message` (string): 표시할 메시지
- `isVisible` (boolean): 표시 여부
- `onClose` (function): 닫기 콜백
- `variant` (string): 'success' | 'error' | 'warning' | 'info' (기본값: 'success')

**Variant별 색상**:
- `success` (초록색): 성공 메시지
- `error` (빨간색): 오류 메시지
- `warning` (노란색): 경고 메시지
- `info` (파란색): 정보 메시지

---

### 2. Alert (확인 알림창)
확인 버튼이 있는 모달 알림창 (유효성 검사 실패, 안내 메시지 등)

**위치**: `src/component/Common/Alert/`

**사용법**:
```jsx
import { useState } from 'react';
import Alert from './component/Common/Alert/Alert';

function MyComponent() {
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        title: '',
        message: '',
        variant: 'info'
    });

    const showAlert = (title, message, variant = 'info') => {
        setAlertConfig({ show: true, title, message, variant });
    };

    const handleFormSubmit = () => {
        if (!isValid) {
            showAlert(
                '유효성 검사 실패',
                '필수 항목을 모두 입력해주세요.',
                'warning'
            );
        }
    };

    return (
        <>
            <button onClick={handleFormSubmit}>제출</button>
            
            <Alert
                show={alertConfig.show}
                onClose={() => setAlertConfig({ ...alertConfig, show: false })}
                title={alertConfig.title}
                message={alertConfig.message}
                variant={alertConfig.variant}
            />
        </>
    );
}
```

**Props**:
- `show` (boolean): 표시 여부
- `onClose` (function): 닫기 콜백
- `title` (string): 제목
- `message` (string): 메시지 내용
- `variant` (string): 'success' | 'error' | 'warning' | 'info' (기본값: 'info')

**사용 예시**:
```jsx
// 유효성 검사 실패
showAlert('입력 오류', '이메일 형식이 올바르지 않습니다.', 'error');

// 로그인 필요
showAlert('안내', '이 기능은 로그인이 필요합니다.', 'info');

// 저장 완료
showAlert('저장 완료', '변경사항이 저장되었습니다.', 'success');
```

---

### 3. ConfirmDialog (확인/취소 대화상자)
취소/확인 버튼이 있는 모달 (게시글 삭제, 로그아웃 등)

**위치**: `src/component/Common/ConfirmDialog/`

**사용법**:
```jsx
import { useState } from 'react';
import ConfirmDialog from './component/Common/ConfirmDialog/ConfirmDialog';
import Toast from './component/Common/Toast/Toast';

function MyComponent() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            // 실제 삭제 API 호출
            await deletePost(postId);
            setToastMessage('게시글이 삭제되었습니다.');
            setShowToast(true);
        } catch (error) {
            setToastMessage('삭제에 실패했습니다.');
            setShowToast(true);
        }
    };

    return (
        <>
            <button onClick={handleDeleteClick}>삭제</button>
            
            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDeleteConfirm}
                title="게시글 삭제"
                message="이 게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다."
                confirmText="삭제"
                cancelText="취소"
                variant="danger"
            />

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                variant="success"
            />
        </>
    );
}
```

**Props**:
- `show` (boolean): 표시 여부
- `onClose` (function): 닫기 콜백
- `onConfirm` (function): 확인 버튼 클릭 시 실행될 함수
- `title` (string): 제목 (기본값: '확인')
- `message` (string): 메시지 내용
- `confirmText` (string): 확인 버튼 텍스트 (기본값: '삭제')
- `cancelText` (string): 취소 버튼 텍스트 (기본값: '취소')
- `variant` (string): 'danger' | 'warning' | 'info' (기본값: 'danger')

**사용 예시**:
```jsx
// 게시글 삭제
<ConfirmDialog
    title="게시글 삭제"
    message="이 게시글을 삭제하시겠습니까?"
    confirmText="삭제"
    variant="danger"
/>

// 로그아웃
<ConfirmDialog
    title="로그아웃"
    message="로그아웃 하시겠습니까?"
    confirmText="로그아웃"
    variant="warning"
/>

// 변경사항 취소
<ConfirmDialog
    title="변경사항 취소"
    message="작성 중인 내용이 있습니다.\n정말로 취소하시겠습니까?"
    confirmText="취소"
    variant="warning"
/>
```

---

## 디자인 특징

### 공통 스타일
- 부트스트랩 기반 모달 시스템
- 둥근 모서리 (border-radius: 12px~16px)
- 부드러운 애니메이션 효과
- 반응형 디자인

### 색상 시스템
| Variant | 아이콘 색상 | 버튼 색상 | 배경 색상 | 용도 |
|---------|------------|----------|----------|------|
| success | #28a745 | #28a745 | #d4edda | 성공, 완료 |
| error | #dc3545 | #dc3545 | #f8d7da | 오류, 실패 |
| warning | #ffc107 | #ffc107 | #fff3cd | 경고, 주의 |
| info | #17a2b8 | #17a2b8 | #d1ecf1 | 정보, 안내 |
| danger | #dc3545 | #dc3545 | #f8d7da | 위험, 삭제 |

### 아이콘
- Toast & Alert
  - success: `bi-check-circle-fill`
  - error: `bi-x-circle-fill`
  - warning: `bi-exclamation-triangle-fill`
  - info: `bi-info-circle-fill`

- ConfirmDialog
  - danger: `bi-trash-fill`
  - warning: `bi-exclamation-triangle-fill`
  - info: `bi-question-circle-fill`

---

## 실전 활용 예시

### 1. 폼 유효성 검사
```jsx
const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
        showAlert(
            '입력 오류',
            '이메일과 비밀번호를 모두 입력해주세요.',
            'warning'
        );
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert(
            '유효성 검사 실패',
            '올바른 이메일 형식이 아닙니다.',
            'error'
        );
        return;
    }
    
    // 제출 로직...
};
```

### 2. API 요청 결과 처리
```jsx
const handleSave = async () => {
    try {
        await saveData(formData);
        showToast('저장되었습니다!', 'success');
    } catch (error) {
        showAlert(
            '저장 실패',
            '데이터 저장 중 오류가 발생했습니다.',
            'error'
        );
    }
};
```

### 3. 게시글 삭제 플로우
```jsx
const handleDelete = () => {
    // 1. 확인 대화상자 표시
    setShowConfirm(true);
};

const confirmDelete = async () => {
    try {
        // 2. 삭제 API 호출
        await deletePost(postId);
        
        // 3. 성공 토스트 표시
        showToast('게시글이 삭제되었습니다.', 'success');
        
        // 4. 목록으로 이동
        navigate('/posts');
    } catch (error) {
        // 5. 실패 시 알림
        showAlert(
            '삭제 실패',
            '게시글 삭제 중 오류가 발생했습니다.',
            'error'
        );
    }
};
```

---

## 예시 컴포넌트

전체 사용 예시는 `src/component/Common/CommonComponentExample.jsx` 파일을 참조하세요.

실행 방법:
1. 라우터에 예시 페이지 추가
2. `/example` 경로로 접속
3. 각 버튼 클릭하여 동작 확인

---

## 빠른 시작

### 1. Toast 사용
```jsx
import Toast from './component/Common/Toast/Toast';
// 상태 관리 + Toast 컴포넌트 추가
```

### 2. Alert 사용
```jsx
import Alert from './component/Common/Alert/Alert';
// 상태 관리 + Alert 컴포넌트 추가
```

### 3. ConfirmDialog 사용
```jsx
import ConfirmDialog from './component/Common/ConfirmDialog/ConfirmDialog';
// 상태 관리 + ConfirmDialog 컴포넌트 추가
```

모든 컴포넌트는 독립적으로 사용 가능하며, 필요에 따라 조합하여 사용할 수 있습니다.

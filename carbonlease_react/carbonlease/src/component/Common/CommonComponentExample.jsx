import { useState } from 'react';
import styled from 'styled-components';
import Alert from '../Alert/Alert';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import Toast from '../Toast/Toast';

const ExampleContainer = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;

    h2 {
        margin-bottom: 30px;
        color: #333;
    }

    .section {
        margin-bottom: 40px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 12px;

        h3 {
            margin-bottom: 20px;
            color: #555;
            font-size: 18px;
        }
    }

    .button-group {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }

    .btn-success {
        background: #28a745;
        color: white;
    }

    .btn-error {
        background: #dc3545;
        color: white;
    }

    .btn-warning {
        background: #ffc107;
        color: #333;
    }

    .btn-info {
        background: #17a2b8;
        color: white;
    }

    .btn-danger {
        background: #dc3545;
        color: white;
    }
`;

/**
 * 공통 컴포넌트 사용 예시
 *
 * 1. Toast - 자동으로 사라지는 알림 (3초)
 * 2. Alert - 확인 버튼이 있는 알림창
 * 3. ConfirmDialog - 취소/확인 버튼이 있는 확인 대화상자 (게시글 삭제 등)
 */
const CommonComponentExample = () => {
    // Toast 상태
    const [toastConfig, setToastConfig] = useState({
        show: false,
        message: '',
        variant: 'success'
    });

    // Alert 상태
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        title: '',
        message: '',
        variant: 'info'
    });

    // ConfirmDialog 상태
    const [confirmConfig, setConfirmConfig] = useState({
        show: false,
        title: '',
        message: '',
        variant: 'danger'
    });

    // Toast 표시
    const showToast = (message, variant = 'success') => {
        setToastConfig({ show: true, message, variant });
    };

    // Alert 표시
    const showAlert = (title, message, variant = 'info') => {
        setAlertConfig({ show: true, title, message, variant });
    };

    // ConfirmDialog 표시
    const showConfirm = (title, message, variant = 'danger') => {
        setConfirmConfig({ show: true, title, message, variant });
    };

    // 삭제 확인 후 실행될 함수
    const handleDelete = () => {
        console.log('게시글이 삭제되었습니다.');
        showToast('게시글이 삭제되었습니다.', 'success');
    };

    return (
        <ExampleContainer>
            <h2>공통 컴포넌트 예시</h2>

            {/* Toast 예시 */}
            <div className="section">
                <h3>1. Toast (자동 사라짐 알림)</h3>
                <div className="button-group">
                    <button 
                        className="btn-success"
                        onClick={() => showToast('성공적으로 처리되었습니다!', 'success')}
                    >
                        성공 Toast
                    </button>
                    <button 
                        className="btn-error"
                        onClick={() => showToast('오류가 발생했습니다.', 'error')}
                    >
                        오류 Toast
                    </button>
                    <button 
                        className="btn-warning"
                        onClick={() => showToast('주의가 필요합니다.', 'warning')}
                    >
                        경고 Toast
                    </button>
                    <button 
                        className="btn-info"
                        onClick={() => showToast('정보를 확인하세요.', 'info')}
                    >
                        정보 Toast
                    </button>
                </div>
            </div>

            {/* Alert 예시 */}
            <div className="section">
                <h3>2. Alert (확인 알림)</h3>
                <div className="button-group">
                    <button 
                        className="btn-success"
                        onClick={() => showAlert(
                            '저장 완료', 
                            '변경사항이 성공적으로 저장되었습니다.', 
                            'success'
                        )}
                    >
                        성공 Alert
                    </button>
                    <button 
                        className="btn-error"
                        onClick={() => showAlert(
                            '오류 발생', 
                            '입력하신 정보를 다시 확인해주세요.', 
                            'error'
                        )}
                    >
                        오류 Alert
                    </button>
                    <button 
                        className="btn-warning"
                        onClick={() => showAlert(
                            '유효성 검사 실패', 
                            '필수 항목을 모두 입력해주세요.', 
                            'warning'
                        )}
                    >
                        경고 Alert
                    </button>
                    <button 
                        className="btn-info"
                        onClick={() => showAlert(
                            '안내', 
                            '이 기능은 로그인이 필요합니다.', 
                            'info'
                        )}
                    >
                        정보 Alert
                    </button>
                </div>
            </div>

            {/* ConfirmDialog 예시 */}
            <div className="section">
                <h3>3. ConfirmDialog (삭제 확인 대화상자)</h3>
                <div className="button-group">
                    <button 
                        className="btn-danger"
                        onClick={() => showConfirm(
                            '게시글 삭제', 
                            '이 게시글을 삭제하시겠습니까?\\n삭제된 게시글은 복구할 수 없습니다.', 
                            'danger'
                        )}
                    >
                        게시글 삭제
                    </button>
                    <button 
                        className="btn-warning"
                        onClick={() => showConfirm(
                            '변경사항 취소', 
                            '작성 중인 내용이 있습니다.\\n정말로 취소하시겠습니까?', 
                            'warning'
                        )}
                    >
                        변경사항 취소
                    </button>
                    <button 
                        className="btn-info"
                        onClick={() => showConfirm(
                            '로그아웃', 
                            '로그아웃 하시겠습니까?', 
                            'info'
                        )}
                    >
                        로그아웃
                    </button>
                </div>
            </div>

            {/* 실제 컴포넌트 렌더링 */}
            <Toast
                message={toastConfig.message}
                isVisible={toastConfig.show}
                onClose={() => setToastConfig({ ...toastConfig, show: false })}
                variant={toastConfig.variant}
            />

            <Alert
                show={alertConfig.show}
                onClose={() => setAlertConfig({ ...alertConfig, show: false })}
                title={alertConfig.title}
                message={alertConfig.message}
                variant={alertConfig.variant}
            />

            <ConfirmDialog
                show={confirmConfig.show}
                onClose={() => setConfirmConfig({ ...confirmConfig, show: false })}
                onConfirm={handleDelete}
                title={confirmConfig.title}
                message={confirmConfig.message}
                confirmText="삭제"
                cancelText="취소"
                variant={confirmConfig.variant}
            />
        </ExampleContainer>
    );
};

export default CommonComponentExample;

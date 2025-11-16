import { useState } from 'react';
import Alert from '../Alert/Alert';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import PageTitle from '../Layout/PageTitle/PageTitle';
import Loading from '../Loading/Loading';
import PageContent from '../PageContent/PageContent';
import Pagination from '../Pagination/Pagination';
import Toast from '../Toast/Toast';
import {
    CodeBlock,
    ComponentSection,
    DemoButton,
    DemoContainer,
    GuideContainer,
    PropsTable,
    SectionTitle,
    SubTitle,
    VariantButtons
} from './ComponentGuide.styled';

const ComponentGuide = () => {
    // Alert 상태
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('info');

    // ConfirmDialog 상태
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmVariant, setConfirmVariant] = useState('danger');

    // Toast 상태
    const [toast, setToast] = useState({
        message: '',
        isVisible: false,
        variant: 'success'
    });

    // Pagination 상태
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    // Loading 상태
    const [showLoading, setShowLoading] = useState(false);

    const showToastMessage = (message, variant = 'success') => {
        setToast({ message, isVisible: true, variant });
    };

    const handleConfirm = () => {
        const message = confirmVariant === 'danger'
            ? '삭제되었습니다!'
            : confirmVariant === 'warning'
            ? '작업이 완료되었습니다!'
            : '확인 버튼을 눌렀습니다!';
        
        showToastMessage(message, 'success');
    };

    const handleShowLoading = () => {
        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
            showToastMessage('데이터 로딩 완료!', 'success');
        }, 3000);
    };

    return (
        <>
            <PageTitle
                title="공통 컴포넌트 가이드"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '가이드', current: true }
                ]}
            />
            <PageContent>
                <GuideContainer>
                    {/* Toast */}
                    <ComponentSection>
                        <SectionTitle>Toast</SectionTitle>
                        <p>사용자에게 짧은 알림 메시지를 표시하는 컴포넌트입니다. 3초 후 자동으로 사라집니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <VariantButtons>
                                <DemoButton
                                    $variant="success"
                                    onClick={() => showToastMessage('성공 메시지입니다!', 'success')}
                                >
                                    Success Toast
                                </DemoButton>
                                <DemoButton
                                    $variant="error"
                                    onClick={() => showToastMessage('에러가 발생했습니다!', 'error')}
                                >
                                    Error Toast
                                </DemoButton>
                                <DemoButton
                                    $variant="warning"
                                    onClick={() => showToastMessage('경고 메시지입니다!', 'warning')}
                                >
                                    Warning Toast
                                </DemoButton>
                                <DemoButton
                                    $variant="info"
                                    onClick={() => showToastMessage('정보 메시지입니다!', 'info')}
                                >
                                    Info Toast
                                </DemoButton>
                            </VariantButtons>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>표시할 메시지</td>
                                </tr>
                                <tr>
                                    <td>isVisible</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>Toast 표시 여부</td>
                                </tr>
                                <tr>
                                    <td>onClose</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>닫기 이벤트 핸들러</td>
                                </tr>
                                <tr>
                                    <td>variant</td>
                                    <td>string</td>
                                    <td>'success'</td>
                                    <td>Toast 스타일 (success, error, warning, info)</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Toast from './Toast';

const [toast, setToast] = useState({
    message: '',
    isVisible: false,
    variant: 'success'
});

const showToast = (message, variant = 'success') => {
    setToast({ message, isVisible: true, variant });
};

// 사용
showToast('저장되었습니다!', 'success');

// JSX
<Toast
    message={toast.message}
    isVisible={toast.isVisible}
    onClose={() => setToast({ ...toast, isVisible: false })}
    variant={toast.variant}
/>`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* Alert */}
                    <ComponentSection>
                        <SectionTitle>Alert</SectionTitle>
                        <p>사용자에게 중요한 정보를 알리는 모달 다이얼로그입니다. 확인 버튼 하나만 있습니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <VariantButtons>
                                <DemoButton
                                    $variant="info"
                                    onClick={() => {
                                        setAlertVariant('info');
                                        setShowAlert(true);
                                    }}
                                >
                                    Info Alert
                                </DemoButton>
                                <DemoButton
                                    $variant="warning"
                                    onClick={() => {
                                        setAlertVariant('warning');
                                        setShowAlert(true);
                                    }}
                                >
                                    Warning Alert
                                </DemoButton>
                                <DemoButton
                                    $variant="error"
                                    onClick={() => {
                                        setAlertVariant('danger');
                                        setShowAlert(true);
                                    }}
                                >
                                    Danger Alert
                                </DemoButton>
                            </VariantButtons>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>show</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>Alert 표시 여부</td>
                                </tr>
                                <tr>
                                    <td>onClose</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>닫기 이벤트 핸들러</td>
                                </tr>
                                <tr>
                                    <td>title</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Alert 제목</td>
                                </tr>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Alert 메시지 내용</td>
                                </tr>
                                <tr>
                                    <td>variant</td>
                                    <td>string</td>
                                    <td>'info'</td>
                                    <td>Alert 스타일 (info, warning, danger)</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Alert from './Alert';

const [showAlert, setShowAlert] = useState(false);

// JSX
<Alert
    show={showAlert}
    onClose={() => setShowAlert(false)}
    title="알림"
    message="입력한 내용이 저장되었습니다."
    variant="info"
/>`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* ConfirmDialog */}
                    <ComponentSection>
                        <SectionTitle>ConfirmDialog</SectionTitle>
                        <p>사용자의 확인이 필요한 작업에 사용하는 모달 다이얼로그입니다. 취소/확인 두 개의 버튼이 있습니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <VariantButtons>
                                <DemoButton
                                    $variant="info"
                                    onClick={() => {
                                        setConfirmVariant('info');
                                        setShowConfirm(true);
                                    }}
                                >
                                    Info Confirm
                                </DemoButton>
                                <DemoButton
                                    $variant="warning"
                                    onClick={() => {
                                        setConfirmVariant('warning');
                                        setShowConfirm(true);
                                    }}
                                >
                                    Warning Confirm
                                </DemoButton>
                                <DemoButton
                                    $variant="error"
                                    onClick={() => {
                                        setConfirmVariant('danger');
                                        setShowConfirm(true);
                                    }}
                                >
                                    Danger Confirm
                                </DemoButton>
                            </VariantButtons>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>show</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>Dialog 표시 여부</td>
                                </tr>
                                <tr>
                                    <td>onClose</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>취소/닫기 이벤트 핸들러</td>
                                </tr>
                                <tr>
                                    <td>onConfirm</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>확인 버튼 클릭 핸들러</td>
                                </tr>
                                <tr>
                                    <td>title</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Dialog 제목</td>
                                </tr>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Dialog 메시지 내용</td>
                                </tr>
                                <tr>
                                    <td>confirmText</td>
                                    <td>string</td>
                                    <td>'확인'</td>
                                    <td>확인 버튼 텍스트</td>
                                </tr>
                                <tr>
                                    <td>cancelText</td>
                                    <td>string</td>
                                    <td>'취소'</td>
                                    <td>취소 버튼 텍스트</td>
                                </tr>
                                <tr>
                                    <td>variant</td>
                                    <td>string</td>
                                    <td>'info'</td>
                                    <td>Dialog 스타일 (info, warning, danger)</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const [showConfirm, setShowConfirm] = useState(false);

const handleDelete = () => {
    // 삭제 로직
    console.log('삭제되었습니다');
};

// JSX
<ConfirmDialog
    show={showConfirm}
    onClose={() => setShowConfirm(false)}
    onConfirm={handleDelete}
    title="게시글 삭제"
    message="정말로 이 게시글을 삭제하시겠습니까?"
    confirmText="삭제"
    cancelText="취소"
    variant="danger"
/>`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* Loading */}
                    <ComponentSection>
                        <SectionTitle>Loading</SectionTitle>
                        <p>데이터를 불러오는 동안 로딩 스피너를 표시하는 컴포넌트입니다. 메시지, 높이, 크기 등을 커스터마이징할 수 있습니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <DemoButton
                                $variant="info"
                                onClick={handleShowLoading}
                                disabled={showLoading}
                            >
                                {showLoading ? '로딩 중...' : 'Loading 테스트 (3초)'}
                            </DemoButton>
                            {showLoading && (
                                <div style={{ marginTop: '20px' }}>
                                    <Loading message="데이터를 불러오는 중..." minHeight="200px" />
                                </div>
                            )}
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>'로딩 중...'</td>
                                    <td>로딩 중 표시할 메시지</td>
                                </tr>
                                <tr>
                                    <td>minHeight</td>
                                    <td>string</td>
                                    <td>'400px'</td>
                                    <td>로딩 컨테이너의 최소 높이</td>
                                </tr>
                                <tr>
                                    <td>size</td>
                                    <td>string</td>
                                    <td>'50px'</td>
                                    <td>스피너의 크기</td>
                                </tr>
                                <tr>
                                    <td>fontSize</td>
                                    <td>string</td>
                                    <td>'16px'</td>
                                    <td>메시지의 글자 크기</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Loading from './Loading';

const [loading, setLoading] = useState(false);

const fetchData = () => {
    setLoading(true);
    getCampaignList(page, 6)
        .then(response => {
            setCampaigns(response.campaigns);
        })
        .catch(error => {
            console.error('에러:', error);
        })
        .finally(() => {
            setLoading(false);
        });
};

// JSX
{loading ? (
    <Loading 
        message="캠페인 정보를 불러오는 중..." 
        minHeight="400px"
        size="50px"
        fontSize="16px"
    />
) : (
    <div>데이터 표시</div>
)}`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* Pagination */}
                    <ComponentSection>
                        <SectionTitle>Pagination</SectionTitle>
                        <p>페이지네이션을 구현하는 컴포넌트입니다. 현재 페이지를 기준으로 이전/다음 페이지 이동이 가능합니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                            <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
                                현재 페이지: {currentPage} / {totalPages}
                            </p>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>currentPage</td>
                                    <td>number</td>
                                    <td>1</td>
                                    <td>현재 페이지 번호</td>
                                </tr>
                                <tr>
                                    <td>totalPages</td>
                                    <td>number</td>
                                    <td>-</td>
                                    <td>전체 페이지 수</td>
                                </tr>
                                <tr>
                                    <td>onPageChange</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>페이지 변경 이벤트 핸들러</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Pagination from './Pagination';

const [currentPage, setCurrentPage] = useState(1);
const totalPages = 10;

const handlePageChange = (page) => {
    setCurrentPage(page);
    // 페이지 변경 시 데이터 새로 불러오기
    fetchData(page);
};

// JSX
<Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
/>`}
                        </CodeBlock>
                    </ComponentSection>
                </GuideContainer>
            </PageContent>

            {/* 실제 컴포넌트들 */}
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
                variant={toast.variant}
            />

            <Alert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                title={alertVariant === 'info' ? '정보' : alertVariant === 'warning' ? '경고' : '위험'}
                message={
                    alertVariant === 'info'
                        ? '이것은 정보성 알림입니다.'
                        : alertVariant === 'warning'
                        ? '주의가 필요한 사항입니다.'
                        : '위험한 작업입니다. 신중히 진행하세요.'
                }
                variant={alertVariant}
            />

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
                title={confirmVariant === 'info' ? '확인' : confirmVariant === 'warning' ? '경고' : '삭제 확인'}
                message={
                    confirmVariant === 'info'
                        ? '계속 진행하시겠습니까?'
                        : confirmVariant === 'warning'
                        ? '이 작업은 주의가 필요합니다. 진행하시겠습니까?'
                        : '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
                }
                confirmText={confirmVariant === 'danger' ? '삭제' : '확인'}
                cancelText="취소"
                variant={confirmVariant}
            />
        </>
    );
};

export default ComponentGuide;

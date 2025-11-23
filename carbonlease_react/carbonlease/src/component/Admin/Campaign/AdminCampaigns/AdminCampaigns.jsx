import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../Common/ConfirmDialog/ConfirmDialog';
import {
    ButtonGroup,
    CategoryBadge,
    CreateButton,
    DeleteButton,
    EditButton,
    PageHeader,
    StatusBadge
} from '../../../Common/DataTable/DataTable.styled';
import Pagination from '../../../Common/Pagination/Pagination';
import Toast from '../../../Common/Toast/Toast';
import useAdminCampaign from './useAdminCampaign';

const AdminCampaigns = (onShowToast) => {

    const navigate = useNavigate();

    // 캠페인 목록 훅 사용
    const {
        campaigns,
        currentPage,
        setCurrentPage,
        loading,
        pageInfo,
    } = useAdminCampaign(onShowToast);
    
    
    
    const handleEdit = (id) => {
        navigate(`/admin/campaigns/update/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        console.log('삭제 확정:', selectedId);
        // TODO: 삭제 API 호출
        setShowConfirm(false);
        setToast({ show: true, message: '삭제되었습니다!', variant: 'success' });
        setSelectedId(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    // 테이블 컬럼 정의
    const columns = [
        {
            header: '순번',
            field: 'campaignNo'
        },
        {
            header: '캠페인명',
            field: 'campaignTitle',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '카테고리명',
            field: 'categoryName',
            render: (value) => (
                <CategoryBadge>{value}</CategoryBadge>
            )
        },
        {
            header: '상태',
            field: 'status',
            render: (value) => (
                <StatusBadge $status={value}>{value}</StatusBadge>
            )
        },
        {
            header: '시작일',
            field: 'startDate'
        },
        {
            header: '종료일',
            field: 'endDate'
        },
        {
            header: '관리',
            field: 'id',
            render: (value) => (
                <ButtonGroup>
                    <EditButton onClick={() => handleEdit(value)}>
                        수정
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(value)}>
                        삭제
                    </DeleteButton>
                </ButtonGroup>
            )
        }
    ];

    return (
        <div>
            <PageHeader>
                <h1>캠페인 관리</h1>
                <CreateButton onClick={() => navigate('/admin/campaigns/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>


            <AdminCampaignList
                campaigns={campaigns}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onFirstPage={handleFirstPage}
                onPrevPage={handlePrevPage}
                onPageClick={handlePageClick}
                onNextPage={handleNextPage}
                onLastPage={handleLastPage}
            />
            
            <ConfirmDialog
                show={showConfirm}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="삭제 확인"
                message="정말로 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                variant="danger"
                showIcon={false}
            />
            
            <Toast
                isVisible={toast.show}
                message={toast.message}
                variant={toast.variant}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default AdminCampaigns;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../Common/ConfirmDialog/ConfirmDialog';
import { CreateButton, PageHeader } from '../../../Common/DataTable/DataTable.styled';
import Pagination from '../../../Common/Pagination/Pagination';
import Toast from '../../../Common/Toast/Toast';
import AdminCampaignList from './components/AdminCampaignList';
import useAdminCampaign from './useAdminCampaign';

// --- 메인 컴포넌트 ---
const AdminCampaigns = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
    

    // Pagination 상태
    const [currentPage, setCurrentPage] = useState(1);
    const { campaigns, pageInfo, loading, error } = useAdminCampaign(currentPage);

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

    return (
        <div>
            <PageHeader>
                <h1>캠페인 관리</h1>
                <CreateButton onClick={() => navigate('/admin/campaigns/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            {loading ? (
                <div>로딩 중...</div>
            ) : error ? (
                <div style={{color:'red'}}>캠페인 목록을 불러오지 못했습니다.</div>
            ) : (
                <AdminCampaignList
                    campaigns={campaigns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageInfo={pageInfo}
                campaignsLength={campaigns.length}
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
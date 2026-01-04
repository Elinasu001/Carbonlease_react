
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCategoriesApi, updateApi } from '../../../../api/campaign/adminCampaignApi';

// 어드민 캠페인 수정 폼 관리 커스텀 훅
const UpdateForm = (onShowToast, auth) => {
    // ===== 라우터 및 상태 선언 =====
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const campaign = location.state;

    // 폼 입력값, 에러, 파일명, 카테고리 옵션
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: ''
    });
    const [errors, setErrors] = useState({});
    const [fileNames, setFileNames] = useState({ thumbnail: '', detailImage: '' });
    const [categoryOptions, setCategoryOptions] = useState([]);

    // 1. 카테고리 로드 (초기 1회)
    useEffect(() => {
        getCategoriesApi()
            .then((res) => {
                const options = res.data.data.map(c => ({ value: c.categoryNo, label: c.categoryName }));
                setCategoryOptions(options);
            })
            .catch(() => setCategoryOptions([]));
    }, []);

    // 2. 초기 데이터 가공 및 셋팅 (데이터 변환 로직을 함수로 분리)
    useEffect(() => {
        const campaign = location.state;
        if (!campaign) return;

        const thumb = campaign.attachments?.find(a => a.fileLevel === 0);
        const detail = campaign.attachments?.find(a => a.fileLevel === 1);

        setFormData(prev => ({
            ...prev,
            ...campaign,
            categoryNo: String(campaign.category?.categoryNo || campaign.categoryNo || ''),
        }));

        setFileNames({
            thumbnail: thumb?.filePath?.split('/').pop() || '',
            detailImage: detail?.filePath?.split('/').pop() || ''
        });
    }, [location.state]);

    // 3. 공통 변경 핸들러 : 폼 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // 3. 공통 변경 핸들러 : 파일 입력 핸들러
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files?.[0]) return;
        
        const type = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        setFileNames(prev => ({ ...prev, [type]: files[0].name }));
    };

    // 4. 폼 유효성 검증
    const validate = () => {
        const newErrors = {};
        const requiredFields = ['campaignTitle', 'categoryNo', 'campaignContent', 'startDate', 'endDate'];
        
        requiredFields.forEach(field => {
            if (!formData[field]?.toString().trim()) newErrors[field] = '필수 입력 항목입니다.';
        });

        if (formData.startDate > formData.endDate) newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 5. 제출 로직
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        
        if (auth && !auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }

        // 빈 파일 처리 최적화
        const files = [
            formData.thumbnailFile || new Blob([], { type: 'image/*' }),
            formData.detailImageFile || new Blob([], { type: 'image/*' })
        ];
        
        try {
            const res = await updateApi(id, files, formData);
            if (res && res.status === 200) {
                onShowToast('게시글 수정이 완료되었습니다!', 'success');
                setTimeout(() => navigate('/admin/campaigns'), 800);
            }
        } catch (error) {
            onShowToast(
                error?.response?.data?.["error-message"] || '수정에 실패했습니다.',
                'error'
            );
        }
    };

    // ===== 취소 핸들러 =====
    const handleCancel = () => {
        navigate('/admin/campaigns');
    };

    // ===== 반환 객체 =====
    return {
        formData,
        setFormData,
        fileNames,
        setFileNames,
        errors,
        setErrors,
        categoryOptions,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel
    };
};

export default UpdateForm;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoriesApi, saveApi } from '../../../../api/campaign/adminCampaignApi';

// 어드민 캠페인 등록 폼 관리 커스텀 훅

const useInsertForm = (onShowToast) => {
    // ===== 라우터 및 상태 선언 =====
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: ''
    });
    const [fileNames, setFileNames] = useState({ thumbnail: '', detailImage: '' });

    // ===== 카테고리 옵션 불러오기 =====
    useEffect(() => {
        const fetchCategories = async () => {
            try {
				const result = await getCategoriesApi();
                const options = (result.data.data || []).map(c => ({ value: c.categoryNo, label: c.categoryName }));
                setCategoryOptions(options);
            } catch {
                setCategoryOptions([]);
            }
        };
        fetchCategories();
    }, []);

    //  폼 필드 변경 처리
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

    // 파일 입력 처리
	const handleFileChange = (e) => {
		const { name, files } = e.target;
		if (files && files[0]) {
			setFormData(prev => ({
				...prev,
				[name]: files[0]
			}));
			const fileType = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
			setFileNames(prev => ({
				...prev,
				[fileType]: files[0].name
			}));
			if (errors[name]) {
				setErrors(prev => ({
					...prev,
					[name]: ''
				}));
			}
		}
	};

    // 폼 유효성 검사
	const validate = () => {
		const newErrors = {};
		if (!formData.campaignTitle.trim()) {
			newErrors.campaignTitle = '제목을 입력해주세요.';
		}
		if (!formData.categoryNo) {
			newErrors.categoryNo = '카테고리를 선택해주세요.';
		}
		if (!formData.campaignContent.trim()) {
			newErrors.campaignContent = '내용을 입력해주세요.';
		}
		if (!formData.thumbnailFile) {
			newErrors.thumbnailFile = '썸네일 이미지를 선택해주세요.';
		}
		if (!formData.detailImageFile) {
			newErrors.detailImageFile = '상세 이미지를 선택해주세요.';
		}
		if (!formData.startDate) {
			newErrors.startDate = '시작일을 선택해주세요.';
		}
		if (!formData.endDate) {
			newErrors.endDate = '종료일을 선택해주세요.';
		}
		if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
			newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};


	// ===== 폼 제출 핸들러 =====
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;

		const campaign = {
			campaignTitle: formData.campaignTitle,
			categoryNo: formData.categoryNo,
			campaignContent: formData.campaignContent,
			startDate: formData.startDate,
			endDate: formData.endDate,
		};

		// 파일 배열 생성 (순서가 중요: 0은 썸네일, 1은 상세이미지)
    	const files = [formData.thumbnailFile, formData.detailImageFile];

		try {
			const res = await saveApi(campaign, files);
			if (res && res.status === 200) {
				console.log(res?.data?.message);
				console.log('캠페인 등록 응답 데이터:', res.data.data);
				onShowToast(res?.data?.message || '게시글 등록이 완료되었습니다121212!', 'success');
				setTimeout(() => {
					navigate('/admin/campaigns');
				}, 800);
			}
		} catch (error) {
			onShowToast(error?.response?.data.message || '등록에 실패했습니다.', 'error');
		}
	};

    //  취소 처리
	const handleCancel = () => {
		navigate('/admin/campaigns');
	};

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
		handleCancel,
		
	};
};

export default useInsertForm;
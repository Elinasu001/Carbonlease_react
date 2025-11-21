import {
    CancelButton,
    FormButtonGroup,
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader,
    SubmitButton
} from '../../Common/DataTable/DataTable.styled';
import FormField from '../../Common/Form/FormField';
import { AuthContext } from '../../Context/AuthContext'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeInsertForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [fix, setFix] = useState("");
    //const [file, setFile] = useState(null);
    const { auth } = useContext(AuthContext);
    const navi = useNavigate();

    // 1. 로그인 안되있으면 빠꾸
    useEffect(() => {
        if (!auth.isAuthenticated) {
        alert("로그인 해주세요");
        navi("/login");
        }
        console.log(auth.accessToken)
    }, [auth.isAuthenticated]);

    // 제출 handler
    const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
        alert("제목과 내용은 필수입니다.");
        return;
    }

    const formData = new FormData();
    formData.append("noticeTitle", title);
    formData.append("noticeContent", content);
    formData.append("fix", fix ? "Y" : "N");   // ★ boolean → 문자열 변환

    axios.post("http://localhost/admin/notices", formData, {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
    })
    .then((res) => {
        console.log(res);
        alert("등록 완료!");
        navi("/admin/notices");
    })
    .catch((err) => {
        console.error(err);
        alert("등록 실패");
        console.log(auth.accessToken);
    });
};

    // 취소버튼 handler
    const handleCancel = () => {
        navigate('/admin/notices');
    };
    
    return (
        <FormContainer>
            <PageHeader>
                <h1>공지사항 등록</h1>
            </PageHeader>

            <FormCard>
                <FormCardHeader>
                    <h5>공지사항 정보</h5>
                </FormCardHeader>

                <FormCardBody>
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="제목"
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="공지사항 제목을 입력하세요"
                        />

                        <FormField
                            label="고정 여부"
                            type="toggle-switch"
                            name="fix"
                            value={fix}
                            onChange={(e) => setFix(e.target.value)}   // e.target.value → boolean
                        />



                        <FormField
                            label="내용"
                            type="textarea"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder="공지사항 내용을 입력하세요"
                            rows={8}
                        />

                        <FormButtonGroup>
                            <CancelButton type="button" onClick={handleCancel}>
                                <i className="fas fa-times"></i>
                                취소
                            </CancelButton>
                            <SubmitButton type="submit">
                                <i className="fas fa-check"></i>
                                등록
                            </SubmitButton>
                        </FormButtonGroup>
                    </form>
                </FormCardBody>
            </FormCard>
        </FormContainer>
    )
}

export default NoticeInsertForm;
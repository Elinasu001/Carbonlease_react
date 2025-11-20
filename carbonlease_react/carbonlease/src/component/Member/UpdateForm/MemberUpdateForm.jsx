import { Button, FormLabel } from "react-bootstrap";
import { DemoContainer } from "../../Common/ComponentGuide/ComponentGuide.styled";
import { FieldGroup, FieldInput, FieldLabel } from "../../Common/Form/FormField.styled";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import Alert from "../../Common/Alert/Alert";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const MemberUpdateForm = () => {


    const [checkAlertTitle, setCheckAlertTitle] = useState("id");
    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const [showSignUpAlert, setShowsignUpAlert] = useState(false);
    const [signUpAlertVariant, setSignUpAlertVariant] = useState('info');
    const [signUpAlertMsg, setSignUpAlertMsg] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");

    const [nickNameMsg, setNickNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");

    const [nickNameMsgStyle, setNickNameMsgStyle] = useState('regInvalidMsg');
    const [emailMsgStyle, setEmailMsgStyle] = useState('regValidMsg');

    const [checkId, setCheckId] = useState(false);
    const [checkNickName, setCheckNickName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const { auth } = useContext(AuthContext);

    const findAddress = () => {

        new daum.Postcode({
            oncomplete: function (data) {

                setAddressLine1(data.address);
            }
        }).open();
    }

    useEffect(() => {
        setNickName(auth.nickName);
        setEmail(auth.email);
        setAddressLine1(auth.addressLine1);
        setAddressLine2(auth.addressLine2);
    },[]);

    return (
        <>
            <PageTitle
                title="정보수정"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '마이페이지', path: '/myPage' },
                    { label: '정보 변경', current: true }
                ]}
            />
            <PageContent>
                {/* onSubmit={handleUpdateMember} */}
                <form >
                    <DemoContainer id="signUpContainer" style={{ maxWidth: '600px' }}>
                        <FieldGroup>
                            <FieldLabel>아이디</FieldLabel>
                            <FieldInput
                                type="text"
                                value={auth.memberId}
                                readOnly
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>닉네임</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                value={nickName}
                                onChange={(e) => setNickName(e.target.value)}
                                required
                            />
                            {/* <Button type='button' onClick={handleCheckNickName}>중복확인</Button> */}
                            <FormLabel className={nickNameMsgStyle}>{nickNameMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>이메일</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {/* <Button type='button' onClick={handleCheckEmail}>중복확인</Button> */}
                            <FormLabel className={emailMsgStyle}>{emailMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <Button variant='primary' type='button' onClick={findAddress}>주소지 검색</Button>
                            <FieldLabel>기본주소</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="기본주소"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                readOnly
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>상세주소</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="상세 주소를 입력하세요"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Button variant='success' type='submit'>정보 수정</Button>
                            <Button variant='outline-success' type='button' onClick={() => navi(-1)}>취소</Button>
                        </FieldGroup>
                    </DemoContainer>
                </form>
                <Alert
                    show={showSignUpAlert}
                    onClose={() => { setShowsignUpAlert(false), signUpAlertVariant === 'info' ? navi('/') : <></> }}
                    title={signUpAlertVariant === 'info' ? '회원가입 성공' : '회원가입 실패'}
                    message={signUpAlertMsg}
                    variant={signUpAlertVariant}
                />

                <Alert
                    show={showCheckAlert}
                    onClose={() => { setShowCheckAlert(false) }}
                    title={checkAlertTitle === 'id' ? '아이디 중복 확인' : checkAlertTitle === 'nickName' ? '닉네임 중복 확인' : '이메일 중복 확인'}
                    message={checkAlertMsg}
                    variant={checkAlertVariant}
                />
            </PageContent>
        </>
    )

}

export default MemberUpdateForm;
import axios from "axios";
import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";

const API_BASE_URL = window.ENV?.API_URL || 'http://localhost:80';


const KakaoCallback = () => {

const { setKakaoInfo,login } = useContext(AuthContext);

const [searchParams] = useSearchParams();
const code = searchParams.get("code");

const navi = useNavigate();



useEffect(() => {
    axios.post(`${API_BASE_URL}/auth/kakaoLogin?code=${code}`
    ).then(result => {
        if(result.data.data.accessToken === undefined){       
        setKakaoInfo({
            memberId : result.data.data.memberId,
            memberPwd : result.data.data.memberPwd
        });
            navi('/kakao/signUp');
            return;
        } else {
            const { memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate, isSocialLogin } = result.data.data;
            login(memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate, isSocialLogin);
            navi('/');
            return;
        }
    }
    ).catch(err => {
        console.error(err);
        navi('/');
        return;
    }
    );

}, []);

return (
    <PageContent>
    <h1>로그인 시도중, 잠시만 기다려주십시오...</h1>
    </PageContent>
);

}

export default KakaoCallback;
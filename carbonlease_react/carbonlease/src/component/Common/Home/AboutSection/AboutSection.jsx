import { useEffect, useRef, useState } from 'react';
import { AboutCol, AboutColTitle, AboutInner, AboutSectionWrapper } from './AboutSection.styled';
import NoticeList from './NoticeList';
import ThisMonthCampaign from './ThisMonthCampaign';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {
    const sectionRef = useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true, // 한 번만 애니메이션 실행
            mirror: false,
            offset: 300 // 트리거 위치를 더 아래로 내려서 스크롤 진입 시에만 동작
        });
    }, []);

    return (
        <AboutSectionWrapper
            id="about"
            ref={sectionRef}
            data-aos="fade-up"
            data-aos-delay="200"
            style={{ padding: 0 }}
        >
            <div className="container">
                {error ? (
                    <div style={{color: 'red', fontWeight: 'bold', textAlign: 'center', margin: '40px 0'}}>
                        데이터가 없습니다.
                    </div>
                ) : (
                    <AboutInner>
                        <AboutCol>
                            <AboutColTitle color="#00a34a">이달의 캠페인</AboutColTitle>
                            <ThisMonthCampaign setError={setError} />
                        </AboutCol>
                        <AboutCol>
                            <AboutColTitle color="#1976d2">공지사항</AboutColTitle>
                            <NoticeList setError={setError} />
                        </AboutCol>
                    </AboutInner>
                )}
            </div>
        </AboutSectionWrapper>
    );
};

export default AboutSection;

import { useState } from 'react';
import { AboutContent, AboutInner, AboutSectionWrapper, ImageFallback, SectionTitle } from './AboutSection.styled';

const AboutSection = () => {
    const [aboutImgError, setAboutImgError] = useState(false);

    return (
        <AboutSectionWrapper id="about">
            <SectionTitle className="container section-title">
                <h2>Carbonlease란?</h2>
            </SectionTitle>

            <div className="container" data-aos="fade-up" data-aos-delay="200">
                <AboutInner>
                    <div data-aos="fade-right" data-aos-delay="300">
                        <ImageFallback>
                            <img
                                src="/src/assets/images/main/carbon_ca.png"
                                className="img-fluid"
                                alt="About"
                                onError={() => setAboutImgError(true)}
                            />
                        </ImageFallback>
                    </div>

                    <AboutContent className="col-lg-6 content" data-aos="fade-left" data-aos-delay="300" data-aos-once="true">
                        <h3>왜 Carbonlease인가요?</h3>
                        <p>
                            카본리즈는 탄소를 절약해 더 나은 미래를 함께 '빌려주는' 친환경 커뮤니티입니다.
                        </p>
                        <ul>
                            <li>
                                <i className="bi bi-check-circle-fill" style={{marginRight: '8px'}}></i>
                                <span>친환경 활동 인증으로 실천 경험 공유</span>
                            </li>
                            <li>
                                <i className="bi bi-check-circle-fill" style={{marginRight: '8px'}}></i>
                                <span>커뮤니티 게시판을 통한 정보 공유와 소통</span>
                            </li>
                            <li>
                                <i className="bi bi-check-circle-fill" style={{marginRight: '8px'}}></i>
                                <span>친환경 캠페인 참여 및 환경 보호 활동</span>
                            </li>
                        </ul>
                        <p>
                            함께 실천하고, 함께 성장하며, 지속가능한 미래를 만들어갑니다.
                        </p>
                    </AboutContent>
                </AboutInner>
            </div>
        </AboutSectionWrapper>
    );
};

export default AboutSection;

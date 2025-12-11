import RegionStatsMap from '../RegionStatsMap/RegionStatsMap';
import { HeroActions, HeroDescription, HeroSectionWrapper, HeroTitle } from './HeroSection.styled';

const HeroSection = () => {
    return (
        <HeroSectionWrapper id="hero">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-4 order-2 order-lg-1 d-flex flex-column justify-content-center">
                        <HeroTitle>탄소중립, 함께 만들어가는 지속가능한 미래</HeroTitle>
                        <HeroDescription>
                            일상 속 친환경 실천을 공유하고 함께 성장하는 탄소중립 커뮤니티 플랫폼
                        </HeroDescription>
                        <HeroActions>
                            <a 
                                href="https://youtu.be/i43vcO-tH24?si=c7cZdJ4XWhnVD1PJ" 
                                className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2" 
                                target="blank"
                            >
                                <i className="bi bi-play-circle"></i>
                                <span>Watch Video</span>
                            </a>
                        </HeroActions>
                    </div>

                    <div className="col-lg-6 order-1 order-lg-2 hero-img">
                        <RegionStatsMap />
                    </div>
                </div>
            </div>
        </HeroSectionWrapper>
    );
};

export default HeroSection;

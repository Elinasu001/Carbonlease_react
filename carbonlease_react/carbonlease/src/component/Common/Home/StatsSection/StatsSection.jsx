import { useEffect } from 'react';
import { StatsSectionWrapper } from './StatsSection.styled';

const StatsSection = () => {
    useEffect(() => {
        const counters = document.querySelectorAll('.stat-counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-end'), 10);
            const duration = 2000; // 2 seconds

            const animateCounter = () => {
                const startTime = Date.now();

                const updateCounter = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * target);

                    counter.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.textContent = '0';
                        animateCounter();
                    }
                });
            }, {
                threshold: 0.3
            });

            observer.observe(counter);
        });
    }, []);

    return (
        <StatsSectionWrapper id="stats">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4">
                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div className="stats-item text-center">
                            <span className="stat-counter" data-end="2500">0</span>
                            <p>커뮤니티 회원</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <div className="stats-item text-center">
                            <span className="stat-counter" data-end="15000">0</span>
                            <p>인증 활동</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
                        <div className="stats-item text-center">
                            <span className="stat-counter" data-end="8500">0</span>
                            <p>절감 CO₂ (kg)</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
                        <div className="stats-item text-center">
                            <span className="stat-counter" data-end="120">0</span>
                            <p>진행 중 캠페인</p>
                        </div>
                    </div>
                </div>
            </div>
        </StatsSectionWrapper>
    );
};

export default StatsSection;

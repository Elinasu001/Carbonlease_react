import styled from 'styled-components';

export const HeroSectionWrapper = styled.section`
    position: relative;
    overflow: hidden;
    margin-top: 120px;
    padding: 45px 0;

    /* AOS 애니메이션 강제 비활성화 */
    & * {
        opacity: 1 !important;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .hero-content {
        padding: 20px 0;
    }
    
    .container .row {
        justify-content: center;
    }

    @media (max-width: 1200px) {
        margin-top: 90px;
    }
`;

export const HeroTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 32px;
    color: var(--heading-color);

    @media (max-width: 768px) {
        font-size: 2rem;
        font-weight: 600;
        margin-top: 24px;
        margin-bottom: 24px;
    }
`;

export const HeroDescription = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.7;
    color: color-mix(in srgb, var(--default-color), transparent 20%);
    margin-bottom: 48px;
    
    @media (max-width: 768px) {
        font-size: 1.125rem;
        margin-bottom: 40px;
    }
`;

export const HeroActions = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 64px;

    @media (max-width: 576px) {
        flex-direction: column;
        gap: 20px;
        margin-bottom: 48px;
    }
`;

import styled from 'styled-components';

export const StatsSectionWrapper = styled.section`
    padding-bottom: 100px;
    background-color: var(--background-color);

    /* AOS 애니메이션 강제 비활성화 */
    & * {
        opacity: 1 !important;
        transform: none !important;
    }

    .stats-item {
        background: white;
        border-radius: 50%;
        width: 180px;
        height: 180px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        border: 3px solid #e8e8e8;

        @media (max-width: 992px) {
            width: 160px;
            height: 160px;
        }

        @media (max-width: 768px) {
            width: 140px;
            height: 140px;
        }

        span {
            font-size: 32px;
            display: block;
            color: #0d6efd;
            font-weight: 700;
            margin-bottom: 6px;

            @media (max-width: 992px) {
                font-size: 28px;
            }

            @media (max-width: 768px) {
                font-size: 24px;
            }
        }

        p {
            color: color-mix(in srgb, var(--default-color), transparent 30%);
            padding: 0;
            margin: 0;
            font-family: var(--heading-font);
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            line-height: 1.4;

            @media (max-width: 768px) {
                font-size: 10px;
            }
        }
    }

    @media (max-width: 1199px) {
        padding-bottom: 60px;
    }

    @media (max-width: 768px) {
        padding-bottom: 40px;
    }
`;

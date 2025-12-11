import styled from 'styled-components';

export const CallToActionSectionWrapper = styled.section`
    padding: 80px 0;
    position: relative;
    clip-path: inset(0);
    background-color: #f8f9fa;

    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }

    h3 {
        font-size: 28px;
        font-weight: 700;
        color: var(--default-color);
        margin-bottom: 20px;
    }

    p {
        color: var(--default-color);
        font-size: 18px;
        margin-bottom: 30px;
    }

    .btn-light {
        background-color: var(--accent-color);
        color: white;
        border: none;
        padding: 12px 40px;
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover {
            background-color: color-mix(in srgb, var(--accent-color) 85%, black 15%);
            transform: translateY(-2px);
        }
    }

    .cta-btn {
        font-family: var(--heading-font);
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 1px;
        display: inline-block;
        padding: 12px 40px;
        border-radius: 50px;
        transition: 0.5s;
        margin: 10px;
        border: 2px solid var(--contrast-color);
        color: var(--contrast-color);

        &:hover {
            background: color-mix(in srgb, var(--accent-color) 90%, white 15%);
        }
    }

    &.accent-background {
        background: var(--accent-color);
    }
`;

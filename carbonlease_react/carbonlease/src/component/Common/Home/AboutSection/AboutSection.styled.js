import styled from 'styled-components';

export const AboutSectionWrapper = styled.section`
    padding: 80px 0;
    background: white;
    border-top: 1px solid #f0f0f0;

    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: 80px;

    span {
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-color);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 15px;
        position: relative;
        padding-bottom: 10px;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background: var(--accent-color);
            border-radius: 2px;
        }
    }

    h2 {
        font-size: 45px;
        font-weight: 700;
        color: var(--heading-color);
        margin-bottom: 20px;
        letter-spacing: -1px;

        @media (max-width: 768px) {
            font-size: 35px;
        }
    }

    p {
        font-size: 17px;
        color: var(--default-color);
        margin: 0;
        line-height: 1.6;
    }

    @media (max-width: 1199px) {
        margin-bottom: 60px;
    }

    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

export const AboutInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;

export const ImageFallback = styled.div`
    width: 400px;
    height: 100%;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 8px;
    color: #9aa0a6;
    font-size: 16px;

    @media (min-width: 992px) {
        min-height: 300px;
    }

    @media (max-width: 768px) {
        min-height: 180px;
    }
`;

export const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    h3 {
        font-size: 28px;
        font-weight: 700;
        color: var(--heading-color);
        margin-bottom: 20px;

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }

    .fst-italic {
        font-style: italic;
        font-size: 16px;
        color: var(--default-color);
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-bottom: 20px;

        li {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 15px;
            color: var(--default-color);

            i {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                color: var(--accent-color);
                border-radius: 50%;
                margin-right: 12px;
                flex-shrink: 0;
                font-size: 22px;
            }

            span {
                flex: 1;
            }
        }
    }

    p {
        font-size: 15px;
        color: var(--default-color);
        line-height: 1.8;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        border: 2px solid #f0f0f0;
        padding: 10px;
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        display: block;
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
            transform: translateY(-3px);
        }
    }
`;

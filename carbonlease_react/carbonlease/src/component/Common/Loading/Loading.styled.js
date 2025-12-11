import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: ${props => props.$minHeight || '400px'};
    padding: 40px 20px;
`;

export const Spinner = styled.div`
    width: ${props => props.$size || '50px'};
    height: ${props => props.$size || '50px'};
    border: 4px solid #f0f0f0;
    border-top: 4px solid var(--accent-color);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 20px;
`;

export const LoadingText = styled.p`
    font-size: ${props => props.$fontSize || '16px'};
    color: #999;
    margin: 0;
    text-align: center;
`;

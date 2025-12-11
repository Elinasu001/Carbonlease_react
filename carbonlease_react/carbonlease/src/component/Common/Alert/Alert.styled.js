import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const variantColors = {
    success: {
        icon: '#28a745',
        button: '#28a745',
        buttonHover: '#218838',
        headerBg: '#e9ecef'
    },
    error: {
        icon: '#dc3545',
        button: '#dc3545',
        buttonHover: '#c82333',
        headerBg: '#e9ecef'
    },
    warning: {
        icon: '#ffc107',
        button: '#ffc107',
        buttonHover: '#e0a800',
        headerBg: '#e9ecef'
    },
    info: {
        icon: '#17a2b8',
        button: '#17a2b8',
        buttonHover: '#138496',
        headerBg: '#e9ecef'
    }
};

export const StyledModal = styled(Modal)`
    .modal-content {
        border-radius: 16px;
        border: none;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
`;

export const AlertHeader = styled(Modal.Header)`
    background-color: ${props => variantColors[props.$variant]?.headerBg || variantColors.info.headerBg};
    border-bottom: none;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;

    .modal-title {
        font-size: 20px;
        font-weight: 700;
        color: #333;
        margin: 0;
    }
`;

export const AlertIcon = styled.i`
    font-size: 32px;
    color: ${props => variantColors[props.$variant]?.icon || variantColors.info.icon};
`;

export const AlertBody = styled(Modal.Body)`
    padding: 20px 30px 30px;
    font-size: 15px;
    color: #666;
    line-height: 1.6;
    text-align: center;
`;

export const AlertFooter = styled(Modal.Footer)`
    border-top: none;
    padding: 0 16px 16px;
    justify-content: center;
`;

export const AlertButton = styled.button`
    background-color: ${props => variantColors[props.$variant]?.button || variantColors.info.button};
    color: white;
    border: none;
    padding: 12px 40px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 120px;

    &:hover {
        background-color: ${props => variantColors[props.$variant]?.buttonHover || variantColors.info.buttonHover};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
    }
`;

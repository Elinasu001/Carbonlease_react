import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const variantColors = {
    danger: {
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

export const ConfirmHeader = styled(Modal.Header)`
    background-color: ${props => variantColors[props.$variant]?.headerBg || variantColors.danger.headerBg};
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

export const ConfirmIcon = styled.i`
    font-size: 32px;
    color: ${props => variantColors[props.$variant]?.icon || variantColors.danger.icon};
`;

export const ConfirmBody = styled(Modal.Body)`
    padding: 20px 30px 30px;
    font-size: 15px;
    color: #666;
    line-height: 1.6;
    text-align: center;
`;

export const ConfirmFooter = styled(Modal.Footer)`
    border-top: none;
    padding: 0 16px 16px;
    justify-content: center;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    max-width: 300px;
`;

export const CancelButton = styled.button`
    flex: 1;
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #5a6268;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ConfirmButton = styled.button`
    flex: 1;
    background-color: ${props => variantColors[props.$variant]?.button || variantColors.danger.button};
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => variantColors[props.$variant]?.buttonHover || variantColors.danger.buttonHover};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
    }
`;

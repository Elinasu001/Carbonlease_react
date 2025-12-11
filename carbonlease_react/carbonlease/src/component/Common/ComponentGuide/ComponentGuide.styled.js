import styled from 'styled-components';

export const GuideContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

export const TabContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e5e7eb;
`;

export const TabButton = styled.button`
    padding: 1rem 2rem;
    border: none;
    background: ${props => props.$active ? '#fff' : 'transparent'};
    color: ${props => props.$active ? '#0ea5e9' : '#6b7280'};
    font-size: 1rem;
    font-weight: ${props => props.$active ? '600' : '500'};
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 3px solid ${props => props.$active ? '#0ea5e9' : 'transparent'};
    margin-bottom: -2px;

    &:hover {
        color: #0ea5e9;
        background: #f8f9fa;
    }
`;

export const TabContent = styled.div`
    display: ${props => props.$active ? 'block' : 'none'};
`;

export const ComponentSection = styled.section`
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    margin-bottom: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    > p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #0ea5e9;
`;

export const SubTitle = styled.h3`
    font-size: 20px;
    color: #34495e;
    margin-top: 30px;
    margin-bottom: 16px;
`;

export const DemoContainer = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 20px;
`;

export const VariantButtons = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const DemoButton = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background: ${props => {
        switch (props.$variant) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'info': return '#0ea5e9';
            default: return '#6b7280';
        }
    }};
    color: #fff;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0.9;
    }

    &:active {
        transform: translateY(0);
    }
`;

export const PropsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    th {
        background: #f9fafb;
        font-weight: 600;
        color: #374151;
        font-size: 14px;
    }

    td {
        color: #6b7280;
        font-size: 14px;

        &:first-child {
            color: #0ea5e9;
            font-family: 'Courier New', monospace;
            font-weight: 500;
        }

        &:nth-child(2) {
            color: #8b5cf6;
            font-family: 'Courier New', monospace;
        }

        &:nth-child(3) {
            color: #10b981;
            font-family: 'Courier New', monospace;
        }
    }

    tbody tr:hover {
        background: #f9fafb;
    }
`;

export const CodeBlock = styled.pre`
    background: #1e293b;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    margin-top: 12px;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #334155;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #64748b;
        border-radius: 4px;

        &:hover {
            background: #94a3b8;
        }
    }
`;

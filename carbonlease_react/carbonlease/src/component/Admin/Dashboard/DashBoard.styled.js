import styled from 'styled-components';

export const DashboardWrapper = styled.div``;

export const DashboardTitle = styled.h5`
    margin: 2rem 0 2rem 0;
    display: block;
`;

export const DashboardRow = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 24px;
    flex-wrap: wrap;
`;

export const DashboardWideSection = styled.section`
    min-width: 720px;
`;

export const DashboardSection = styled.section`
    min-width: 600px;
`;

export const DashboardSubTitle = styled.h6`
    margin-bottom: 12px;
`;

export const ChartContainer = styled.div`
    width: 100%;
    max-width: 700px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 16px;
    margin-bottom: 24px;
`;

export const SmallChartContainer = styled.div`
    width: 100%;
    max-width: 320px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 16px;
    margin-bottom: 24px;
`;

export const ChartTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
`;

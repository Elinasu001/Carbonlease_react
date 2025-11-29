import styled from "styled-components";

/* Sidebar 전체 */
export const SidebarWrapper = styled.div`
  position: sticky;
  top: 220px;
  align-self: flex-start;

  min-width: 270px;
  flex-shrink: 0;

  padding: 14px;
  background: #fff;

  border-radius: 14px;
  border: 1px solid rgba(35,165,91,0.15);

  height: fit-content;

  box-shadow:
    0 0 4px rgba(35,165,91,0.15),
    0 2px 6px rgba(0,0,0,0.08);

  z-index: 2000;

  @media(max-width: 992px) {
    display: none;
  }

  .region-select-box {
    margin-bottom: 12px;
    text-align: center;
  }

  .region-select {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(35,165,91,0.4);
    background: #fefefc;

    font-size: 14px;
    font-weight: 600;
    color: #1a6b3e;
  }
`;

export const RegionBox = styled.div`
  background: #ffffff;
  border: 1px solid rgba(35,165,91,0.4);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;

  .title {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
  }

  .time {
    font-size: 12px;
    color: #777;
    margin-bottom: 12px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
  }

  .value {
    font-weight: 700;
    color: #28a745;
  }
`;

export const SidoInfoBox = styled.div`
  background: #f6fff9;
  padding: 18px;
  border: 1px solid rgba(35,165,91,0.4);
  border-radius: 12px;
  text-align: center;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .arrow {
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 700;
    color: #1a6b3e;
    cursor: pointer;
    padding: 4px 8px;
  }

  .title {
    font-size: 15px;
    font-weight: 700;
    color: #1a6b3e;
  }

  .date {
    font-size: 12px;
    color: #666;
    margin: 4px 0;
  }

  .value {
    font-size: 20px;
    font-weight: 800;
    color: #1b9a50;
  }
`;

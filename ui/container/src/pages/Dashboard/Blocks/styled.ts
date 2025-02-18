import styled from "@emotion/styled";

export const StyledSideMenu = styled.div`
  width: 275px;
  min-width: 275px;
  background: #f9fafc;
  box-shadow: 0 0 28px 0 rgba(82, 63, 105, 0.2);
  box-shadow: 0 0 28px 0 rgba(82, 63, 105, 0.2);
  position: relative;
  z-index: 666;
  height: 100%;
  .asideMenuContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
    .asideMenuListWrapper {
    }
  }
`;

export const StyledDashboardSubHeader = styled.div`
  background: #f9fafc;
  border-bottom: 1px solid #e9eef9;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .subHeaderInfo {
    padding: 9px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .title {
      border-right: 1px solid #e9eef9;
      font-weight: 600;
      color: #868daa;
      padding: 10px 25px 10px 25px;
      font-size: 16px;
      line-height: 16px;
    }
    .description {
      padding: 10px 25px;
      font-size: 14px;
      line-height: 16px;
      color: #4e5983;
      text-transform: capitalize;
    }
  }
  .subHeaderToolbar {
    margin-left: auto;
  }
`;

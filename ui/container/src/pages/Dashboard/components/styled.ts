import styled from "@emotion/styled";

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
      .icon {
      padding-right: 10px;
    }
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
    padding: 0px 30px;
  }
`;

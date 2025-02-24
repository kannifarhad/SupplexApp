import styled from "@emotion/styled";

export const StyledActionPopover = styled.div`
  width: 325px;
  height: 150px;
  overflow: hidden;
  position: relative;

  .popoverContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .popoverInfo {
      display: flex;
      align-items: center;
    }
    .popoverMessage {
      h4 {
        font-size: 16px;
        margin: 0px;
        margin-bottom: 5px;
        font-weight: 500;
      }
      p {
        font-size: 12px;
      }
      text-align: left;
    }

    .popoverActions {
      display: flex;
      margin-top: auto;
      gap: 10px;
    }
  }

  .successMessage {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #04c985;
    align-items: center;
  }
`;

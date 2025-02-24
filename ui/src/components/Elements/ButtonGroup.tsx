import { ButtonGroup as ButtonGroupMUI } from "@mui/material";
import { ButtonPropsType } from "./Button";
import Button from "./Button";

export type ButtonGroupProps = {
  buttonList: ButtonPropsType[];
};

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { buttonList, ...buttonGroupProps } = props;

  return (
    <ButtonGroupMUI 
      sx={{
        display: "block",
        "& button": {
          margin: "1px 0px",
        },
      }} 
      {...buttonGroupProps}>
      {Array.isArray(buttonList) &&
        buttonList.map((button, index) => <Button key={index} {...button} />)}
    </ButtonGroupMUI>
  );
};

export default ButtonGroup;

import { memo } from "react";
import { Button as ButtonMui, ButtonProps } from "@mui/material";
import LoadingCircle from "./LoadingCircle";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

export type ButtonPropsType = {
  title?: string | JSX.Element;
  color?: ButtonProps['color'] | 'red' | 'purple' | 'yellow' | 'orange' | 'green' | 'gray' | 'default';
  icon?: JSX.Element | boolean;
  disableElevation?: boolean;
  fullWidth?: boolean;
  className?: string;
  isLoading?: boolean;
  accessId?: string;
  iconright?: boolean;
  children?: any;
  to?: string;
} & Omit<ButtonProps, "color" | "title">;

export const StyledButton = styled(ButtonMui)<{ colorType: ButtonPropsType['color'], theme?: Theme}>(({ theme, colorType = "default" }) => {
  const { background, hover } = theme.customStyles.buttons.colors[colorType] || theme.customStyles.buttons.colors.default;

  return {
    backgroundColor: background,
    color: "#fff",
    borderColor: background,
    "&:hover, &.active": {
      backgroundColor: hover,
      borderColor: background,
      color: "#fff",
    },
    "&.MuiButton-outlined": {
      backgroundColor: "transparent",
      color: background,
      "&:hover": {
        backgroundColor: background,
        color: "#fff",
      },
    },
  };
});

export const Button: React.FC<ButtonPropsType> = ({ title, color, icon, iconright, onClick, isLoading, children, variant="outlined", to, sx, ...rest }) => {
  const navigate = useNavigate();
  const handleOnClick = to ? () => navigate(to) : onClick;

  return (
    <StyledButton
      variant={variant}
      colorType={color}
      sx={{
        textTransform: "inherit",
        ...sx,
      }}
      {...rest}
      onClick={handleOnClick}
    >
      {isLoading && (
        <span className="loginLoadingIcon">
          <LoadingCircle
            color="inherit"
            style={{
              width: "20px",
              height: "20px",
              color: "#fff",
              marginRight: "18px",
            }}
          />
        </span>
      )}

      {icon && !iconright && <span style={{ marginRight: 10 }}>{icon}</span>}
      {title || children}
      {icon && iconright && <span style={{ marginLeft: 10 }}>{icon}</span>}
    </StyledButton>
  );
};

export default memo(Button);
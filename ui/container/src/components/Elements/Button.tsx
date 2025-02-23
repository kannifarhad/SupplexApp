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
  loading?: boolean;
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
    padding: "7px 20px",
    ".buttonBase": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      ".icon": {
        fontSize: "18px",
        lineHeight: "18px",
      },
    },
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

export const Button: React.FC<ButtonPropsType> = ({
  title,
  color,
  icon,
  iconright,
  onClick,
  loading,
  children,
  variant = "outlined",
  to,
  sx,
  disabled,
  ...rest
}) => {
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
      disabled={loading || disabled}
    >
      <div className="buttonBase">
        {loading ? (
          <span className="loginLoadingIcon">
            <LoadingCircle
              color="#fff"
              style={{
                width: "18px",
                height: "18px",
                color: "#fff",
                marginRight: "10px",
              }}
            />
          </span>
        ) : (
          icon && !iconright && <span className="icon">{icon}</span>
        )}
        {title || children}
        {icon && iconright && <span className="icon">{icon}</span>}
      </div>
    </StyledButton>
  );
};

export default memo(Button);

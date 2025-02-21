import { CSSProperties } from 'react';
import { Button as ButtonMui ,ButtonProps, SxProps } from '@mui/material';
import LoadingCircle from './LoadingCircle';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";

export type ButtonPropsType = {
  title?: string | JSX.Element;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'] | 'red' | 'purple' | 'yellow' | 'orange' | 'green' | 'gray' | 'btn-info' | 'default';
  type?: ButtonProps["type"];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement> | any) => any;
  key?: number;
  icon?: JSX.Element | boolean;
  disabled?: boolean;
  disableElevation?: boolean;
  pageComponent?: JSX.Element;
  exact?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
  accessId?: string;
  iconright?: boolean;
  children?: any;
  component?: any;
  to?: string;
  id?: any;
  theme?: any;
  sx?: SxProps;
};

const buttonColors = {
  purple: { background: "#485dc6", hover: "#8095ff" },
  red: { background: "#e83c3c", hover: "#d01919" },
  default: { background: "#2185d0", hover: "#0d71bb" },
  orange: { background: "#f2711c", hover: "#f26202" },
  green: { background: "#63ac74", hover: "#3d864e" },
  yellow: { background: "#e8b316", hover: "#daa300" },
};

export const StyledButton = styled(ButtonMui)(({ colorType = "default" }:{ colorType: ButtonPropsType['color']}) => {
  const { background, hover } = buttonColors[colorType] || buttonColors.default;

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
      backgroundColor: "#fff",
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
  const handleOnClick = to ? ()=> navigate(to) : onClick;

  return (
    <StyledButton
      variant={variant}
      colorType={color}
      sx={{
        textTransform: "inherit",
        ...sx
      }}
      {...rest}
      onClick={handleOnClick}
    >
      {
        isLoading &&
        <span className="loginLoadingIcon">
          <LoadingCircle
            color="inherit"
            style={{
              width: '20px',
              height: '20px',
              color: '#fff',
              marginRight: '18px',
            }}
          />
        </span>
      }

      {icon && !iconright && <span style={{ marginRight: 10 }}>{icon}</span>}
      {title || children}
      {icon && iconright && <span style={{ marginLeft: 10 }}>{icon}</span>}
    </StyledButton>
  );
};

export default Button;

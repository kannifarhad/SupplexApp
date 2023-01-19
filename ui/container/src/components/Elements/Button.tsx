import { CSSProperties } from 'react';
import { Button as ButtonMUI, ButtonProps, SxProps } from '@mui/material';
import LoadingCircle from './LoadingCircle';
import clsx from 'clsx'

export type ButtonPropsType = {
  title?: string | JSX.Element;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'] | 'red' | 'blue' | 'yellow' | 'orange' | 'green' | 'gray' | 'btn-info' | 'default';
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

export const Button: React.FC<ButtonPropsType> = (props) => {
  const { title, color, icon, iconright, onClick, isLoading, className, children, sx, ...rest } = props;

  return (
    <ButtonMUI
      color="primary"
      variant="outlined"
      className={clsx('buttonDefault', className, {
        'redButton': color === "red",
        'blueButton': color === "blue",
        'yellowButton': color === "yellow",
        'orangeButton': color === "orange",
        'greenButton': color === "green",
        'defaultButton': color === "default",
      })}
      sx={{
        textTransform: "inherit",
        ...sx
      }}
      {...rest}
      onClick={onClick}
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

      {icon && !iconright && <span style={{ marginRight: "10px" }}>
        {icon}
      </span>}
      {children}
      {title}
      {icon && iconright && <span style={{ marginLeft: "10px" }}>
        {icon}
      </span>}
    </ButtonMUI>
  );
};

export default Button;

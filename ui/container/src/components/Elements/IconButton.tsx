import { CSSProperties } from "react";
import { IconButton, Tooltip, IconButtonProps, SxProps } from "@mui/material";
import clsx from "clsx";
import styled from "@emotion/styled";

export type UIIconButtonProps = {
  title: string;
  icon: JSX.Element;
  color?: "red" | "blue" | "yellow" | "orange" | "green" | "default";
  className?: string;
  size?: IconButtonProps["size"];
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  key?: number;
  sx?: SxProps;
};

// Define colors
const buttonColors: Record<string, { background: string; hover: string }> = {
  default: { background: "#f1f1f1", hover: "#e0e0e0" },
  red: { background: "#e83c3c", hover: "#d01919" },
  blue: { background: "#2185d0", hover: "#0d71bb" },
  orange: { background: "#f2711c", hover: "#f26202" },
  green: { background: "#63ac74", hover: "#3d864e" },
  yellow: { background: "#e8b316", hover: "#daa300" },
};

// Styled IconButton with dynamic colors
const StyledIconButton = styled(IconButton)<{ colorType?: string }>(({ colorType = "default" }) => {
  const { background, hover } = buttonColors[colorType] || buttonColors.default;

  return {
    backgroundColor: background,
    borderRadius: "5px",
    minWidth: "35px",
    transition: "background 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: hover,
    },
    "&.MuiIconButton-sizeSmall": {
      fontSize: "0.85rem",
      padding: "8px",
    },
    "&.groupSplit": {
      padding: "8px 0px",
      fontSize: "1.25rem",
    },
  };
});

const UIIconButton: React.FC<UIIconButtonProps> = ({
  title,
  color = "default",
  icon,
  className,
  sx,
  ...rest
}) => {
  return (
    <Tooltip title={title} arrow>
      <span>
        <StyledIconButton
          colorType={color}
          className={clsx("buttonDefault", className)}
          sx={sx}
          {...rest}
        >
          {icon}
        </StyledIconButton>
      </span>
    </Tooltip>
  );
};

export default UIIconButton;
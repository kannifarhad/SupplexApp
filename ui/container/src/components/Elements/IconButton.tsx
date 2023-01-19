import { CSSProperties } from "react";
import { IconButton, Tooltip, IconButtonProps, SxProps, ButtonProps } from "@mui/material";
import clsx from "clsx";

export type UIIconButtonProps = {
  title: string;
  icon: JSX.Element;
  color?: "red" | "blue" | "yellow" | "orange" | "green" | "default";
  className?: string;
  variant?: string;
  size?: IconButtonProps["size"];
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  key?: number;
  sx?: SxProps;
};

export default (props: UIIconButtonProps) => {
  const { title, color, icon, className, sx, ...rest } = props;

  return (
    <Tooltip title={title} arrow>
      <span>
        <IconButton
          color="primary"
          className={clsx("buttonDefault", className, {
            'redButton': color === "red",
            'blueButton': color === "blue",
            'yellowButton': color === "yellow",
            'orangeButton': color === "orange",
            'greenButton': color === "green",
            'defaultButton': color === "default",
          })}
          sx={{
            textTransform: "inherit",
            borderRadius: "5px",
            background: "#f1f1f1",
            minWidth: "35px",
            "&.groupSplit": {
              padding: "8px 0px",
              fontSize: "1.25rem",
            },
            "&.MuiIconButton-sizeSmall": {
              fontSize: "0.85rem",
              padding: "8px",
            },
            ...sx
          }}
          variant="outlined"
          {...rest}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

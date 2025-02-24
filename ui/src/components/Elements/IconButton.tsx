import { IconButton, Tooltip, IconButtonProps, Theme } from "@mui/material";
import styled from "@emotion/styled";

export type UIIconButtonProps = {
  title: string;
  icon: JSX.Element;
  color?: "red" | "blue" | "yellow" | "orange" | "green" | "default";
} & IconButtonProps;

// Styled IconButton with dynamic colors
const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "colorType",
})<{ colorType?: string, theme?: Theme }>(({ colorType = "default", theme }) => {
  const { background, hover } = theme.customStyles.buttons.colors[colorType] ||theme.customStyles.buttons.colors.default;

  return {
    // backgroundColor: background,
    borderRadius: "5px",
    minWidth: "35px",
    transition: "background 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: hover,
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
  sx,
  ...rest
}) => {
  return (
    <Tooltip title={title} arrow>
      <span>
        <StyledIconButton
          colorType={color}
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
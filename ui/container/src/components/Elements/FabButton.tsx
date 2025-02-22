import { Tooltip, Theme, Fab, FabProps } from "@mui/material";
import styled from "@emotion/styled";

export type FabButtonProps = {
  title?: string;
  icon: JSX.Element;
  color?: "red" | "gray" | "yellow" | "orange" | "green" | "default";
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
} & Omit<FabProps, "color">;

const StyledFabButton = styled(Fab)<{ colorType?: string; theme?: Theme }>(
  ({ colorType = "default", theme }) => {
    const { background, hover } = theme.customStyles.buttons.colors[colorType] || theme.customStyles.buttons.colors.default;
    return {
      borderRadius: "5px",
      background: theme.customStyles?.colors?.lightGrey?.light,
      border: `1px solid ${theme.customStyles?.colors?.lightGrey?.main}`,
      boxShadow: "none",
      "& span": {
        fontSize: "18px",
        lineHeight: "25px",
        color: background,
      },
      "&:hover": {
        background: `${background}`,
        borderColor: hover,
        "& span": {
          color: theme.customStyles?.colors?.lightGrey?.light
        }
      }
    };
  }
);

const FabButton: React.FC<FabButtonProps> = ({
  title,
  color = "default",
  size = "small",
  icon,
  className,
  sx,
  ...rest
}) => {
  return (
    <Tooltip title={title} aria-label="edit">
      <StyledFabButton size={size} colorType={color} {...rest}>
        {icon}
      </StyledFabButton>
    </Tooltip>
  );
};

export default FabButton;

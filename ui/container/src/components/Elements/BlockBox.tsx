import { Paper, PaperProps, Box } from "@mui/material";
import { memo } from "react";
import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

type BlockBoxProps = {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
  toolbar?: JSX.Element;
} & PaperProps;

const StyledBlockBoxHead = styled(Box)<{
  theme?: Theme;
}>(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    borderBottom: `1px solid #ccc`,
    gap:"20px",
    ".text": {
      display: "flex",
      flexDirection: "column",
      h3: {
        margin: "0px",
        padding: "0px",
      },
      span:{
        fontSize: "13px"
      }
    },
    ".icon":{
        fontSize: "25px"
    },
    ".toolbar": {
      marginLeft: "auto",
    },
  };
});

export const BlockBoxHead = memo(
  ({
    title,
    subtitle,
    icon,
    toolbar,
  }: Pick<BlockBoxProps, "title" | "subtitle" | "icon" | "toolbar">) => {
    return (
      <StyledBlockBoxHead>
        <div className="icon">{icon}</div>
        <div className="text">
          <h3>{title}</h3>
          <span>{subtitle}</span>
        </div>
        <div className="toolbar">{toolbar}</div>
      </StyledBlockBoxHead>
    );
  }
);

export const BlockBox = ({
  title,
  subtitle,
  icon,
  toolbar,
  children,
  ...rest
}: BlockBoxProps) => {
  return (
    <Paper elevation={0} {...rest}>
      <BlockBoxHead
        title={title}
        subtitle={subtitle}
        icon={icon}
        toolbar={toolbar}
      />
      <Box>{children}</Box>
    </Paper>
  );
};
export default BlockBox;

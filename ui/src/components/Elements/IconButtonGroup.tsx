import IconButton from "./IconButton";
import { ButtonGroup, SxProps, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UIIconButtonProps } from "./IconButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "block",
    "& button": {
      margin: "1px 0px",
      borderLeft: "1px solid ",
      borderRadius: "0px",
      "&:first-of-type": {
        borderLeft: "none !important ",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
      },
      "&:last-of-type": {
        borderRight: "none !important ",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
      },
    },
  },
}));

type UIIconButtonGroup = {
  buttonList: UIIconButtonProps[];
  sx?: SxProps;
};

export default (props: UIIconButtonGroup) => {
  const { buttonList, sx, ...iconButtonGroupProps } = props;

  const classes = useStyles();

  return (
    <ButtonGroup className={classes.root} {...iconButtonGroupProps}>
      {Array.isArray(buttonList) &&
        buttonList.map((button, index) => (
          <IconButton key={index} sx={sx} {...button} />
        ))}
    </ButtonGroup>
  );
};

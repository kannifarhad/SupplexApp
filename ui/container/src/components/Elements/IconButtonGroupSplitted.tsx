import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton, { UIIconButtonProps } from "./IconButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    "& button": {
      margin: "0px 3px",
      border: "1px solid ",
    },
  },
}));

export type UIIconButtonGroupSplitted = {
  buttonList: UIIconButtonProps[];
};

export default (props: any) => {
  const { buttonList, ...rest } = props;

  const classes = useStyles();

  return (
    <Box className={classes.root} {...rest}>
      {Array.isArray(buttonList) &&
        buttonList.map((button, index) => (
          <IconButton key={index} className="groupSplit" {...button} />
        ))}
    </Box>
  );
};

import Button from "./Button";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ButtonGroupProps } from "./ButtonGroup";

const useStyles = makeStyles({
  root: {
    display: "block",
    "& .MuiButton-root": {
      marginRight: 5,
    },
  },
});

const ButtonGroupSplitted: React.FC<ButtonGroupProps> = (props) => {
  const classes = useStyles();
  const { buttonList, ...rest } = props;

  return (
    <Box className={classes.root}>
      {Array.isArray(buttonList) &&
        buttonList.map((button, index) => <Button key={index} {...button} />)}
    </Box>
  );
};

export default ButtonGroupSplitted;

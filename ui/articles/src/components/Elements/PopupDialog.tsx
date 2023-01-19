import React, { CSSProperties } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
  Slide,
  Grid,
  DialogProps,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "./IconButton";

const styles = {
  root: {
    margin: 0,
    padding: 0,
  },
  closeButton: {
    marginLeft: "auto",
    padding: "10px !important",
  },
  paperHead: {
    "& .MuiGrid-root": {
      padding: "15px 20px",
      display: "flex",
      alignItems: "center",
    },
    "& .icon": {
      background: "#f1f1f1",
      fontSize: "1.2rem",
    },
  },
  smallFab: {
    width: "25px",
    height: "25px !important",
    fontSize: "0.75rem",
    minHeight: "auto",
  },
};

type PopupDialogProps = {
  open: boolean;
  title?: string | JSX.Element | any;
  onClose: (event?: any) => void;
  buttons?: JSX.Element;
  children?: JSX.Element | null;
  icon?: JSX.Element;
  fullWidth?: boolean;
  maxWidth: DialogProps['maxWidth'];
  nodividers?: boolean;
};

type MuiDialogTitleProps = {
  onClose: () => void;
  children: JSX.Element;
  icon?: JSX.Element;
  classes: any;
};

const MuiDialogTitle = withStyles(styles)((props: MuiDialogTitleProps) => {
  const { icon, children, classes, onClose, ...other } = props;

  return (
    <DialogTitle
      // disableTypography
      className={classes.root}
      {...other}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        className={classes.paperHead}
      >
        {icon ? <Grid className="icon">{icon}</Grid> : null}

        <Grid className="title">
          <Typography variant="h6" component="p">
            {children}
          </Typography>
        </Grid>
        {onClose ? (
          <Grid className={classes.closeButton} >
            <IconButton aria-label="close" title="Bağla" style={{ 'padding': '5px' }} onClick={onClose} icon={<span className="fas fa-times" />} />
          </Grid>
        ) : null}
      </Grid>
    </DialogTitle>
  );
});

const MuiDialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(DialogContent);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  paper: {
    overflowY: "hidden"
  },
});

const AlertDialogSlide: React.FC<PopupDialogProps> = (props) => {
  const { open, title, icon, buttons, onClose, children, nodividers = true, ...dialogProps } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      className="dialogBlock"
      classes={{
        paper: classes.paper,
      }}
      {...dialogProps}
    >
      <MuiDialogTitle onClose={onClose} icon={icon}>
        {title}
      </MuiDialogTitle>

      <MuiDialogContent dividers={nodividers}>{children}</MuiDialogContent>

      <DialogActions className="dialogButtons">{buttons}</DialogActions>
    </Dialog>
  );
};

export default AlertDialogSlide;

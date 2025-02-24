import { Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    rootBox: {
        boxSizing: 'border-box',
        margin: "0px auto",
        padding: "50px 20px ",
        position: "relative",
        maxWidth: '700px',
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        margin: '30px',
        fontWeight: "600"
    },

    svgBox: {
        display: "inline-block",
        position: "relative",
        width: "150px",
    },

    greenStroke: {
        stroke: "#7CB342"
    },

    redStroke: {
        stroke: "#FF6245"
    },

    yellowStroke: {
        stroke: "#FFC107"
    },

    circular: {
        "& circle.path": {
            strokeDasharray: 330,
            strokeDashoffset: 0,
            strokeLinecap: "round",
            opacity: 0.4,
            animation: "$draw-circle 0.3s ease-out",
        }
    },

    checkmark: {
        strokeWidth: 6.25,
        strokeLinecap: "round",
        position: "absolute",
        top: "56px",
        left: "49px",
        width: "52px",
        height: "40px",
        "& path": {
            animation: "1s $draw-check ease-out"

        }
    },

    cross: {
        strokeWidth: 6.25,
        strokeLinecap: "round",
        position: "absolute",
        top: "54px",
        left: "54px",
        width: "40px",
        height: "40px",
        "& .first-line": {
            animation: "0.7s $draw-first-line ease-out"
        },
        "& .second-line": {
            animation: "0.7s $draw-second-line ease-out"
        }
    },

    alertSign: {
        strokeWidth: 6.25,
        strokeLinecap: "round",
        position: "absolute",
        top: "40px",
        left: "68px",
        width: "15px",
        height: "70px",
        animation: "0.5s $alert-sign-bounce cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "& .dot": {
            stroke: "none",
            fill: "#FFC107"
        }
    },

    "@keyframes draw-circle": {
        "0%": {
            strokeDasharray: "0,330",
            strokeDashoffset: "0",
            opacity: "1",
        },

        "80%": {
            strokeDasharray: "330,330",
            strokeDashoffset: "0",
            opacity: "1",
        },

        "100%": {
            opacity: "0.4",
        },
    },

    "@keyframes draw-check": {
        "0%": {
            strokeDasharray: "49,80",
            strokeDashoffset: "48",
            opacity: "0",
        },

        "50%": {
            strokeDasharray: "49,80",
            strokeDashoffset: "48",
            opacity: "1",
        },

        "100%": {
            strokeDasharray: "130,80",
            strokeDashoffset: "48",
        }
    },

    "@keyframes draw-first-line": {
        "0%": {
            strokeDasharray: "0,56",
            strokeDashoffset: "0",
        },

        "50%": {
            strokeDasharray: "0,56",
            strokeDashoffset: "0",
        },

        "100%": {
            strokeDasharray: "56,330",
            strokeDashoffset: "0",
        },
    },

    "@keyframes draw-second-line": {
        "0%": {
            strokeDasharray: "0,55",
            strokeDashoffset: "1",
        },

        "50%": {
            strokeDasharray: "0,55",
            strokeDashoffset: "1",
        },

        "100%": {
            strokeDasharray: "55,0",
            strokeDashoffset: "70",
        },
    },

    "@keyframes alert-sign-bounce": {
        "0%": {
            transform: "scale(0)",
            opacity: "0",
        },

        "50%": {
            transform: "scale(0)",
            opacity: "1",
        },

        "100%": {
            transform: "scale(1)",
        }
    }

});

export type ResultBoxProps = {
    title: string;
    description?: string | string[] | JSX.Element[] | JSX.Element;
    type: 'error' | 'success' | 'warning';
    footer?: any;
};

export const ResultBox = ({ title, description, type, footer, ...rest }: ResultBoxProps) => {
    const classes = useStyles();

    const Icon = () => {
        switch (type) {
            case 'error':
                return <ErrorIcon />

            case 'success':
                return <SuccessIcon />

            case 'warning':
                return <WarningIcon />

            default:
                return <ErrorIcon />
        }
    };

    return (
        <Box className={classes.rootBox} {...rest}>
            <Icon />

            <Typography variant="h4" align="center" className={classes.title}>
                {title}
            </Typography>

            {(typeof description === "string") ?
                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 400 }}>
                    {description}
                </Typography>
                :
                <Box width={"100%"} my={1.5}>{description}</Box>
            }

            <Box style={{ paddingTop: "30px" }}>
                {footer}
            </Box>
        </Box>
    );
}

export const SuccessIcon = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.svgBox}>
                <svg className={`${classes.circular} ${classes.greenStroke}`}>
                    <circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
                </svg>
                <svg className={`${classes.checkmark} ${classes.greenStroke}`}>
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                        <path className="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53" />
                    </g>
                </svg>
            </Box>
        </>
    );
};

export const ErrorIcon = () => {
    const classes = useStyles();
    return (
        <Box className={classes.svgBox}>
            <svg className={`${classes.circular} ${classes.redStroke}`}>
                <circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
            </svg>

            <svg className={`${classes.cross} ${classes.redStroke}`}>
                <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                    <path className="first-line" d="M634.087,300.805L673.361,261.53" fill="none" />
                </g>
                <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                    <path className="second-line" d="M634.087,300.805L673.361,261.53" />
                </g>
            </svg>
        </Box>

    );
};

export const WarningIcon = () => {
    const classes = useStyles();
    return (
        <Box className={classes.svgBox}>

            <svg className={`${classes.circular} ${classes.yellowStroke}`}>
                <circle className="path" cx="75" cy="75" r="50" fill="none" strokeWidth="5" strokeMiterlimit="10" />
            </svg>
            <svg className={`${classes.alertSign} ${classes.yellowStroke}`}>
                <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                    <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                        <path className="line" d="M634.087,300.805L673.361,261.53" fill="none" />
                    </g>
                    <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                        <circle className="dot" cx="621.52" cy="316.126" r="1.318" />
                    </g>
                </g>
            </svg>
        </Box>
    );
};
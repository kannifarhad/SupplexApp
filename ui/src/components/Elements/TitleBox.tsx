import { Typography, Grid, Toolbar, Box } from '@mui/material';
import { CSSProperties } from 'react';

const stylingObject = {
    rootBox: {
        display: "flex",
        alignItems: "center",
        borderRadius: "6px 6px 0 0",
        border: "1px solid #C4C4C4"
    },
    iconAndTitleBox: {
        display: "flex",
        alignItems: "center",
        minWidth: "fit-content",
    },
    icon: {
        padding: "16px 20px",
        borderRadius: "6px 0 0 0",
        fontSize: "20px",
        backgroundColor: "#F1F1F1",
    },
};

type SectionTitleProps = {
    title: string | JSX.Element | undefined;
    icon?: JSX.Element;
    element?: JSX.Element;
    style?: CSSProperties;
};

export const TitleBox: React.FC<SectionTitleProps> = (props) => {
    const { title, icon, element, style } = props;

    return (
        <Box sx={stylingObject.rootBox}>
            <Grid item sx={stylingObject.iconAndTitleBox}>
                <Grid item sx={stylingObject.icon}>{icon}</Grid>
                <Typography variant='h6' ml={2}>{title}</Typography>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
                <Toolbar sx={{ minHeight: "55px !important" }} style={style}>
                    {element}
                </Toolbar>
            </Grid>
        </Box>
    );
};

export default TitleBox;
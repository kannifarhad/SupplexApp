import {
    Alert,
    AlertTitle,
    AlertColor,
    SxProps
} from '@mui/material';

export type AlertMessage = {
    id: string | number;
    title: string | JSX.Element;
    text?: string | JSX.Element;
    type?: AlertColor;
}

type UIAlertProps = {
    msg: AlertMessage;
    className?: string;
    deleteMessages?: (id: string | number) => void;
    sx?: SxProps
}

export default ({ msg, deleteMessages, ...rest }: UIAlertProps) => {
    const { id, text, title, type, ...restMsg } = msg;
    const handleClose = () => {
        if (deleteMessages) {
            deleteMessages(id)
        }
    }
    return (
        <Alert
            severity={type}
            onClose={typeof deleteMessages === 'function' ? handleClose : undefined}
            {...restMsg}
            {...rest}
        >
            <AlertTitle sx={{margin: 0}}>{title}</AlertTitle>
            {text}
        </Alert>
    );
}

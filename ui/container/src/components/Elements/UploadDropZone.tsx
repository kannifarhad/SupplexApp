import { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, LinearProgress } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Button, IconButton } from '.';

export enum MimeTypeEnum {
    All = '*',
    DOC = 'application/msword',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    PDF = 'application/pdf',
    JPEG = 'image/jpeg',
    JPG = 'image/jpg',
    PNG = 'image/png',
    BMP = 'image/bmp',
    GIF = 'image/gif',
}

const useStyles = makeStyles({
    dropzone: {
        border: "2px dashed #3f51b5",
        borderRadius: "10px",
        padding: "50px 0",
        textAlign: "center",
        color: "#000",
        '&.active': {
            // borderColor: "#fff",
            backgroundColor: "#c8d0ff"
        }
    },
    files: {
        width: "20%",
        margin: "0 auto"
    }
})

export interface IDropZone {
    options: {
        uploadLimit: number,
        allowed: MimeTypeEnum[],
        title: string,
        description?: string,
    },
    getFilesBack: (files: File[]) => Promise<void>
}

enum DropzoneGenericErrorsEnum {
    LIMIT_EXCEEDED = "Fayl yükləmə limitinə çatmısınız",
    UNALLOWED_FILE_FORMAT = 'İcazə verilən fayl formatları'
}


const DropZone: React.FC<IDropZone> = ({ options, getFilesBack }) => {
    const classes = useStyles();
    const { uploadLimit, title, allowed, description } = options
    const [dropzoneActive, setDropzoneActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<DropzoneGenericErrorsEnum[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const handleDrop = (e: any) => {
        e.preventDefault();
        let filesLength = files.length
        const droppedFiles: File[] = e.dataTransfer.files

        for (let fileIndex = 0; fileIndex < droppedFiles.length; fileIndex++) {
            // console.log('type = ', droppedFiles[fileIndex].type);

            const isAllowedFileType = allowed.includes(droppedFiles[fileIndex].type as MimeTypeEnum)

            if (!isAllowedFileType) setErrors(prevErrors => [...prevErrors, DropzoneGenericErrorsEnum.UNALLOWED_FILE_FORMAT])

            if (filesLength < uploadLimit && isAllowedFileType) {
                setFiles((prevFiles) => [...prevFiles, droppedFiles[fileIndex]])
                filesLength++
            }
            else break;
        }
    }

    const handleUpload = () => {
        if (files) {
            setLoading(true)
            getFilesBack(files).finally(() => { setLoading(false) })
        }

    }

    useEffect(() => {
        files.length < uploadLimit && setErrors([])
        files.length === uploadLimit && setErrors(prevErrors => [...prevErrors, DropzoneGenericErrorsEnum.LIMIT_EXCEEDED])
    }, [files.length])


    return <>
        <div
            className={classes.dropzone + (dropzoneActive ? " active" : "")}
            onDrop={e => handleDrop(e)}
            onDragOver={e => { setDropzoneActive(true); e.preventDefault(); }}
            onDragLeave={e => { setDropzoneActive(false); e.preventDefault(); }}
        >
            <Typography variant="h5" fontWeight={500}>{title} </Typography>
            <Typography variant="h6" mt={2}>{description ?? "Fayllarınızı bura sürüşdürün"} </Typography>
            <Typography variant="h6">Limit: {uploadLimit}</Typography>
            {
                errors &&
                Array.from(new Set(errors)).map((error, index) => <Typography
                    key={index}
                    variant="body1" sx={{ color: "#c91f00" }}>{error} {error === DropzoneGenericErrorsEnum.UNALLOWED_FILE_FORMAT ? `: ${allowed.join(', ')}` : ''} </Typography>)
            }
            <List className={classes.files}>
                {files.map((file, fileIndex) => {
                    let progress = 25;
                    return <ListItem disablePadding key={fileIndex}>
                        <ListItemButton component="button" onClick={() => window.open(URL.createObjectURL(file), 'Image', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')}>
                            <ListItemAvatar>
                                <Avatar src={URL.createObjectURL(file)} variant="square" />
                            </ListItemAvatar>
                            <ListItemText primary={file.name} />
                            <LinearProgress variant="buffer" value={progress} valueBuffer={progress} />
                            <IconButton
                                title="Siyahıdan çıxar"
                                onClick={(e) => { e.preventDefault(); setFiles(prevData => prevData.filter((item, clickedIndex) => clickedIndex != fileIndex)) }}
                                icon={<span className='fas fa-times'></span>}
                            />
                        </ListItemButton>
                    </ListItem>
                })}
            </List>
            {                
                <Button
                    variant="contained"
                    component="label"
                    size="large"
                    icon={<span className="fas fa-upload"></span>}
                    sx={{ marginTop: "1rem" }}
                    onClick={handleUpload}
                    disabled={files.length !== uploadLimit || loading}
                >
                    {
                        loading ?  "Gözləyin..." : "Yüklə"
                    }

                </Button>
            }
        </div>
    </>
}

export default DropZone
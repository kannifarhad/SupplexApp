import { Dispatch, SetStateAction } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import Button from './Button';
 
const FileInputField = ({ selectedFileList, handleChangeSelectedFile }: {
  selectedFileList: FileList | null,
  handleChangeSelectedFile: Dispatch<SetStateAction<FileList | null>>
}) => {

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files;
    if (!fileList) return;
    handleChangeSelectedFile(fileList);
  }

  return (
    <Box component={Paper} className='fileInputContainer'>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Box className='fileInputBox'>
            <Box className='fileInputBar'>
              <Box px={2} className='fileNameContainer'>
                <span className='fileName'>
                  {
                    selectedFileList &&
                    Array.from(selectedFileList).map((file, index) => (`${file.name} ${index + 1 !== selectedFileList.length ? ', ' : ''}`))
                  }
                </span>
              </Box>
              <Button
                title={selectedFileList && Array.from(selectedFileList).length > 0 ? 'Faylı dəyiş' : 'Faylı yüklə'}
                variant='contained'
                color='primary'
                size='large'
                icon={<span className='fa-solid fa-upload'></span>}
                className='fileChooseButton'
              />
            </Box>
            <input
              multiple={false}
              type='file'
              accept='text/xml'
              onChange={handleFileSelected}
              className='fileInput'
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FileInputField;
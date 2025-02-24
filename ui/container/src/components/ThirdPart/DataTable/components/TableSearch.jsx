import React from 'react';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  theme => ({
    main: {
      display: 'flex',
      flex: '1 0 auto',
      alignItems: "center"
    },
    searchIcon: {
      color: theme.palette.text.secondary,
      marginRight: '8px',
    },
    searchText: {
      flex: '0.8 0',
    },
    clearIcon: {
      '&:hover': {
        color: theme.palette.error.main,
      },
    },
  }),
  { name: 'MUIDataTableSearch' },
);

const TableSearch = ({ options, searchText, onSearch, onHide }) => {
  const classes = useStyles();

  const handleTextChange = event => {
    onSearch(event.target.value);
  };

  const onKeyDown = event => {
    if (event.key === 'Escape') {
      onHide();
    }
  };

  const clearIconVisibility = options.searchAlwaysOpen ? 'hidden' : 'visible';

  return (
    <Grow appear in={true} timeout={300}>
      <div className={classes.main}>
      <span className={`fas fa-search ${classes.searchIcon}`}></span>
        <TextField
          className={classes.searchText}
          autoFocus={true}
          variant={'standard'}
          InputProps={{
            'data-test-id': options.textLabels.toolbar.search,
          }}
          inputProps={{
            'aria-label': options.textLabels.toolbar.search,
          }}
          value={searchText || ''}
          onKeyDown={onKeyDown}
          onChange={handleTextChange}
          fullWidth={true}
          placeholder={options.searchPlaceholder}
          {...(options.searchProps ? options.searchProps : {})}
        />
        <IconButton className={classes.clearIcon} style={{ visibility: clearIconVisibility }} onClick={onHide}>
          <span className="fas fa-times"></span>
        </IconButton>
      </div>
    </Grow>
  );
};

export default TableSearch;

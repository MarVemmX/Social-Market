import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { SearchRounded } from '@material-ui/icons';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ListHistorySearch from './SearchHistory';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    width: '100%',
    display: 'flex',
    flexFlow: 'flex nowrap',
    flex: 1,
    position: 'relative',
    zIndex: 999,
  },
  searchIcon: {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    width: 80,
    padding: theme.spacing(1),
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
  },
  inputRoot: {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    flex: 1,
    color: 'inherit',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    flex: 1,
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),

    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function SearchBar({ onShowOverlay }) {
  const [listHistory, setListHistory] = useState(
    JSON.parse(localStorage.getItem('history_search')) || []
  );

  const [value, setValue] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const history = useHistory();

  const handleDeleteSearch = (item) => {
    setShowHistory(true);
    let newListHistory = [...listHistory];
    newListHistory = newListHistory.filter((x) => x !== item);
    setListHistory(newListHistory);
    localStorage.setItem('history_search', JSON.stringify(newListHistory));
  };

  const handleFocusSearch = () => {
    setShowHistory(true);
    onShowOverlay((x) => !x);
    setListHistory(JSON.parse(localStorage.getItem('history_search')) || []);
  };

  const handleSearch = (e) => {
    setShowHistory(false);
    onShowOverlay(false);
    e.preventDefault();

    history.push({
      pathname: '/products',
      search: queryString.stringify(value === null || value === '' ? {} : { name_contains: value }),
    });

    if (value === null || value === '') return;

    const listHistorySearch = JSON.parse(localStorage.getItem('history_search')) || [];
    const newList = [...listHistorySearch];
    if (listHistorySearch.includes(value)) newList.splice(newList.indexOf(value), 1);
    newList.push(value);
    localStorage.setItem('history_search', JSON.stringify(newList));
  };

  const handleBlurSearch = () => {
    setShowHistory(false);
    onShowOverlay(false);
  };

  const handleReSearch = (newValue) => {
    const newList = [...listHistory];
    newList.splice(newList.indexOf(newValue), 1);
    newList.push(newValue);
    localStorage.setItem('history_search', JSON.stringify(newList));
    history.push({
      pathname: '/products',
      search: queryString.stringify({ name_contains: newValue }),
    });
    setValue(newValue);
    setShowHistory(false);
  };

  const handleChangeValue = (newValue) => {
    onShowOverlay(true);
    setValue(newValue);
    const localStoredHistory = JSON.parse(localStorage.getItem('history_search')) || [];
    setListHistory(localStoredHistory.filter((x) => x.toLowerCase().indexOf(newValue) !== -1));
  };

  const classes = useStyles();

  return (
    <form onSubmit={(e) => handleSearch(e)} className={classes.search}>
      <InputBase
        value={value}
        autoComplete="off"
        onFocus={handleFocusSearch}
        onBlur={handleBlurSearch}
        onChange={(e) => handleChangeValue(e.target.value)}
        name="name_contains"
        placeholder="Tìm kiếm sản phẩm"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        // onKeyDown={() => handleSearch(value)}
      />
      {!!showHistory && listHistory?.length > 0 && (
        <ListHistorySearch
          handleReSearch={handleReSearch}
          listHistory={listHistory}
          handleDeleteSearch={handleDeleteSearch}
        />
      )}
      <div className={classes.searchIcon} onClick={(e) => handleSearch(e)}>
        <SearchRounded />
      </div>
    </form>
  );
}

export default SearchBar;

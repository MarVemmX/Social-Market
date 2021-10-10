import {
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  toggleSearch: {
    position: 'absolute',
    background: theme.palette.background.paper,
    width: `calc(100% - 80px)`,
    top: '100%',
    zIndex: 99,
    padding: 0,
    boxShadow: theme.shadows[5],
  },
  labelSearch: {
    margin: theme.spacing(0.5, 0, 0.5, 2),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    background: theme.palette.background.paper,
  },
  textSearch: {
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(-2),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));
function ListHistorySearch({ listHistory, handleReSearch = null, handleDeleteSearch = null }) {
  const classes = useStyles();
  return (
    <Fade in timeout={300}>
      <List
        component="nav"
        disablePadding={true}
        className={classes.toggleSearch}
        // classes={{ padding: 0 }}
      >
        <Typography component="h6" className={classes.labelSearch}>
          Lịch sử tìm kiếm
        </Typography>
        <Divider />
        {listHistory
          .slice(-5)
          .reverse()
          .map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                dense
                button
                onMouseDown={() => handleReSearch(item)}
                onClick={() => handleReSearch(item)}
              >
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.textSearch,
                  }}
                  primary={item}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Xóa">
                    <IconButton edge="end" aria-label="delete">
                      <CloseIcon
                        fontSize="small"
                        onMouseDown={() => handleDeleteSearch(item)}
                        onClick={() => handleDeleteSearch(item)}
                      />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    </Fade>
  );
}

ListHistorySearch.propTypes = {
  listSearch: PropTypes.array,
  handleReSearch: PropTypes.func,
  handleDeleteSearch: PropTypes.func,
};

export default ListHistorySearch;

import { Avatar, Button, Grid, IconButton, makeStyles } from '@material-ui/core';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import userApi from '../../../api/userApi';
import BackdropFull from '../../../components/Loading/loadingFull';
import { updateAvatar, updateUser } from '../../Auth/userSlice';
import { toggleBackdrop } from '../../System/systemSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  avatar: {
    // display: 'block',

    border: `1px solid ${theme.palette.primary.dark}`,

    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    display: 'none',
  },
  rootButtonUpload: {
    position: 'absolute',
    bottom: '0px',
    right: '0%',
  },
  buttonUpload: {
    background: theme.palette.grey[300],
    '&:hover': {
      background: theme.palette.grey[400],
    },
  },
  boxButton: {
    marginTop: theme.spacing(2),
  },
}));

function UploadAvatar({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const showLoading = useSelector((state) => state.system.isShowLoading);
  const classes = useStyles();

  const handleUpLoadClick = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectFile(reader.result);
      setFile(file);
    };

    setShowButton(true);
  };

  const handleResetAvatar = () => {
    setSelectFile(user.avatar);
    setShowButton(false);
  };

  const handleSubmit = async (event) => {
    dispatch(toggleBackdrop(true));
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append('image', file);
      const id = user._id;
      unwrapResult(await dispatch(updateAvatar({ formData, id })));
      dispatch(toggleBackdrop(false));
      toast.success('Cập nhật ảnh đại diện thành công 😘 !');
      history.push(`/profile/${id}`);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleBackdrop(false));
    }
  };
  return (
    <>
      <div className={classes.root}>
        <Avatar className={classes.avatar} src={selectFile || user.avatar}></Avatar>
        <div className={classes.rootButtonUpload}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={(e) => handleUpLoadClick(e)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              className={classes.buttonUpload}
              component="span"
            >
              <PermMediaOutlinedIcon />
            </IconButton>
          </label>
        </div>
      </div>
      <BackdropFull showLoading={showLoading} />
      {showButton && (
        <div className={classes.boxButton}>
          <Button variant="outlined" color="primary" size="small" onClick={(e) => handleSubmit(e)}>
            Xác nhận
          </Button>
          &nbsp;
          <Button variant="contained" color="secondary" size="small" onClick={handleResetAvatar}>
            Hủy
          </Button>
        </div>
      )}
    </>
  );
}

export default UploadAvatar;

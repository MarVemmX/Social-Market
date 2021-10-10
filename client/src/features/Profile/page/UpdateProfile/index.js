import { LinearProgress, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import useUserDetail from '../../../../hooks/useUserDetail';
import { updateUser } from '../../../Auth/userSlice';
import UpdateProfileForm from '../UpdateProfile/form';

UpdateProfile.propTypes = {
  // closeDialog: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    params: { id },
  } = useRouteMatch();

  console.log(id, 'upload');

  const { user, loading } = useUserDetail(id);
  if (loading) {
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }
  const handleSubmit = async (values) => {
    const id1 = user._id;
    values.id = user._id;
    try {
      unwrapResult(await dispatch(updateUser(values)));
      toast.success('Cập nhật ảnh thông tin thành công!');

      history.push(`/profile/${id1}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.paper}>
        <UpdateProfileForm onSubmit={handleSubmit} user={user} />
      </Paper>
    </Container>
  );
}

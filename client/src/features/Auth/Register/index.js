import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../userSlice';
import RegisterForm from './form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const { retypePassword, ...valuesSubmit } = values;
      const action = register(valuesSubmit);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      toast.success('Đăng kí thành công !');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </Container>
  );
}

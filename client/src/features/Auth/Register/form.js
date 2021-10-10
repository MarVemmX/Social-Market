import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  LinearProgress,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../components/InputField';
import PasswordField from '../../../components/PasswordField';
import RadioField from '../../../components/RadioBox';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 1, 0, 1),
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
    margin: theme.spacing(2, 0, 1, 0),
  },
  progress: {
    top: theme.spacing(1),
    position: 'absolute',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  login: {
    color: theme.palette.primary.light,
    fontSize: '1rem',
    textDecoration: 'none',
  },
}));
function RegisterForm({ handleClose, onSubmit }) {
  const schema = yup.object().shape({
    username: yup.string().required('Tên tài khoản không được để trống !'),
    name: yup
      .string()
      .required('Họ tên không được để trống !')
      .test('Họ và tên phải trên 2 từ ', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Email không được để trống !')
      .email('Nhập đúng định dạng email !'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống !')
      .min(6, 'Mật khẩu phải trên 6 kí tự'),

    retypePassword: yup
      .string()
      .required('Nhập lại mật khẩu không được để trống !')
      .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không chính xác !'),
    phone: yup.string().required('Số điện thoại không được để trống !'),
  });
  const form = useForm({
    defaultValues: {
      gender: 'male',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const listData = [
    { value: 'male', name: 'Nam' },
    { value: 'female', name: 'Nữ' },
    { value: 'other', name: 'Khác' },
  ];

  const classes = useStyles();
  const { isSubmitting } = form.formState;
  return (
    <Container component="main">
      <CssBaseline />
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <IconButton aria-label="clear" className={classes.closeBtn} onClick={handleClose}>
        <CloseIcon color="primary" />
      </IconButton>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí
        </Typography>
        <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <InputField name="username" label="Tài khoản" form={form} />
            </Grid>
            <Grid item xs={12}>
              <InputField name="name" label="Họ và tên" form={form} />
            </Grid>
            <Grid item xs={12}>
              <InputField name="email" label="Gmail" form={form} />
            </Grid>
            <Grid item xs={12}>
              <InputField name="phone" label="Số điện thoại" form={form} />
            </Grid>
            <Grid item xs={12}></Grid>

            <RadioField
              name="gender"
              defaultValue="male"
              dataList={listData}
              inline={true}
              form={form}
            />

            <Grid item xs={12}>
              <PasswordField name="password" label="Mật khẩu" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />
            </Grid>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className={classes.login}>
                  Bạn đã có tài khoản ? Đăng nhập ngay
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;

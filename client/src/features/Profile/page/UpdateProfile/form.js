import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PhotoCamera } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/InputField';
import RadioField from '../../../../components/RadioBox';
import UploadAvatar from '../../Components/uploadAvatar';

UpdateProfileForm.propTypes = {
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
    border: `1px solid ${theme.palette.primary.dark}`,
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0),
    position: 'relative',
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
  buttonSuccess: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonProgress: {
    color: theme.palette,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
  },
}));
function UpdateProfileForm({ onSubmit, user }) {
  let { address, email, name, phone, gender } = user;
  const schema = yup.object().shape({
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
    phone: yup.string(),

    address: yup.string(),
  });
  const form = useForm({
    defaultValues: {
      name: name,
      email: email,
      gender: gender,
      phone: phone,
      address: address,
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
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Cập nhật thông tin người dùng
        </Typography>
        <UploadAvatar user={user} />
        <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid container>
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

            <Grid item xs={12}>
              <InputField name="address" label="Địa chỉ" form={form} />
            </Grid>

            <RadioField
              name="gender"
              defaultValue="male"
              dataList={listData}
              inline={true}
              form={form}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Cập nhật
              {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default UpdateProfileForm;

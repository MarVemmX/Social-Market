import { Button, LinearProgress, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import UpdateProfile from './page/UpdateProfile';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import useUserDetail from '../../hooks/useUserDetail';
import { formatDateTime } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    height: '100%',
    margin: '0 1px',
  },
  avatar: {
    // display: 'block',
    padding: theme.spacing(1),
    borderRadius: '100%',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  boxDetail: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    color: theme.palette.grey[600],
    fontWeight: 'bold',
    fontSize: '1rem',
    // marginLeft: '1rem',
  },
  userInfo: {
    color: theme.palette.grey[700],
    fontWeight: 500,
    fontSize: '0.8rem',
    marginLeft: '0.4rem',
  },
  flexInfo: {
    display: 'flex',
    // flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(0.5),
    color: theme.palette.grey[600],
    '& > span': {
      fontSize: '0,9rem',
      marginLeft: theme.spacing(1),
    },
    '&icons': {
      marginRight: theme.spacing(2),
    },
  },
  btnUpdate: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: theme.spacing(2),
  },
}));

function ProfileFeature(props) {
  const history = useHistory();
  // const user = useSelector((state) => state.user.current) || {};
  // const userLogin = JSON.parse(localStorage.getItem('user')) || user;

  const classes = useStyles();
  const {
    params: { id },
    url,
  } = useRouteMatch();
  const { user, loading } = useUserDetail(id);

  console.log(id, 'trang chi tiet nguoi dung');

  if (loading) {
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }

  const goToUpdateProfile = () => {
    history.push(`${url}/edit`);
  };
  return (
    <>
      <Box mt={2}>
        <CssBaseline />
        <Container maxWidth="md">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/">
              SecondHand Shop
            </Link>
            <Box fontSize={8}>
              <Typography color="textPrimary">{user.name}</Typography>
            </Box>
          </Breadcrumbs>
          <Grid container p={2} alignItems="stretch" direction="row">
            <Grid xs={6}>
              <Paper className={classes.paper}>
                <Box mr={0.5}>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Avatar className={classes.avatar} src={user.avatar}></Avatar>
                    <Box>
                      <Typography className={classes.userName}>{user.name || '__'}</Typography>
                      <div className={classes.flexInfo}>
                        <CallOutlinedIcon className={classes.profileRight_icon}></CallOutlinedIcon>
                        <Typography className={classes.userInfo}>{user.phone || '__'}</Typography>
                      </div>
                      <div className={classes.flexInfo}>
                        <FavoriteBorderIcon
                          className={classes.profileRight_icon}
                        ></FavoriteBorderIcon>
                        <Typography className={classes.userInfo}>
                          {!!user.gender ? (user.gender === 'male' ? 'Nam' : 'Nữ') : '__'}
                        </Typography>
                      </div>
                    </Box>
                  </Grid>
                </Box>
                <div className={classes.btnUpdate}>
                  <Button variant="outlined" onClick={goToUpdateProfile}>
                    Cập nhật thông tin
                  </Button>
                </div>
              </Paper>
            </Grid>

            <Grid xs={6}>
              <Paper className={classes.paper}>
                <Grid>
                  <div className={classes.flexInfo}>
                    <StarOutlineIcon className={classes.profileRight_icon}></StarOutlineIcon>
                    <span> Đánh giá :</span>
                    <Typography className={classes.userInfo}>
                      {user.role || ' Chưa đánh giá'}
                    </Typography>
                  </div>
                  <div className={classes.flexInfo}>
                    <DateRangeIcon className={classes.profileRight_icon}></DateRangeIcon>
                    <span> Ngày tham gia :</span>
                    <Typography className={classes.userInfo}>
                      {user.createdAt ? formatDateTime(user.createdAt) : '__'}
                    </Typography>
                  </div>
                  <div className={classes.flexInfo}>
                    <RoomOutlinedIcon className={classes.profileRight_icon}></RoomOutlinedIcon>
                    <span> Địa chỉ :</span>
                    <Typography className={classes.userInfo}>{user.address || '__'}</Typography>
                  </div>
                  <div className={classes.flexInfo}>
                    <MailOutlineOutlinedIcon
                      className={classes.profileRight_icon}
                    ></MailOutlineOutlinedIcon>
                    <span> Email :</span>
                    <Typography className={classes.userInfo}>{user.email || '__'}</Typography>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Switch>
          <Route path={`${url}/edit`} component={UpdateProfile} />
        </Switch>
      </Box>
    </>
  );
}
export default ProfileFeature;

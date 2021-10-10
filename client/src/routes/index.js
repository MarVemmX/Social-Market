import React from 'react';
import NotFound from './../components/NotFound';
import PostFeature from './../features/Post';
import LoginFeature from './../features/Auth/Login';
import RegisterFeature from './../features/Auth/Register';
import ProfileFeature from './../features/Profile';
import UpdateProfile from './../features/Profile/page/UpdateProfile';
const routes = [
  {
    path: '/',
    exact: true,
    main: () => <PostFeature />,
  },
  {
    path: '/login',
    exact: false,
    main: () => <LoginFeature />,
  },
  {
    path: '/register',
    exact: false,
    main: () => <RegisterFeature />,
  },
  {
    path: '/profile/:id',
    exact: true,
    main: () => <ProfileFeature />,
  },
  {
    path: '/profile/:id/edit',
    exact: true,
    main: () => <UpdateProfile />,
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;

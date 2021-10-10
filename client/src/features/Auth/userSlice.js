import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { StorageKeys } from '../../constants/storageKey';
// import { toastError } from "../../components/Notification";

export const register = createAsyncThunk('users/register', async (payload) => {
  const data = await userApi.register(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

export const login = createAsyncThunk('users/login', async (payload) => {
  //call Api login
  const data = await userApi.login(payload);

  //save data to localStorage
  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return data to reducer
  return data.user;
});

export const updateUser = createAsyncThunk('users/update', async (payload) => {
  //call Api login
  const data = await userApi.updateUser(payload);

  //save data to localStorage
  // localStorage.setItem(StorageKeys.TOKEN, data.token);
  // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return data to reducer
  return data.user;
});

export const updateAvatar = createAsyncThunk('users/update_avatar', async (payload) => {
  //call Api login
  const { formData, id } = payload;
  const data = await userApi.updateAvatar(formData, id);

  //save data to localStorage
  // localStorage.setItem(StorageKeys.TOKEN, data.token);
  // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return data to reducer
  return data.user;
});

export const getUser = createAsyncThunk('users/detail', async (payload) => {
  //call Api login
  const data = await userApi.getUser(payload);

  //save data to localStorage
  // localStorage.setItem(StorageKeys.TOKEN, data.token);
  // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return data to reducer
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [register.rejected]: (_, action) => {},
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.rejected]: (_, action) => {},
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;

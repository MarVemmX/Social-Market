import { createSlice } from '@reduxjs/toolkit';
// import { toastError } from "../../components/Notification";

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    isDarkMode: false,
    isShowLoading: false,
  },
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },

    toggleBackdrop(state) {
      state.isShowLoading = !state.isShowLoading;
    },
  },
});

const { actions, reducer } = systemSlice;
export const { toggleDarkMode, toggleBackdrop } = actions;
export default reducer;

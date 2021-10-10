import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    // id , product{}, quantity
    user: {},
    // isShowMiniCart: false,
  },
  reducers: {
    showMiniCart(state) {
      state.isShowMiniCart = true;
    },
    hideMiniCart(state) {
      state.isShowMiniCart = false;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === newItem.id);

      if (index >= 0) {
        state.cartItem[index].quantity += newItem.quantity;
      } else {
        state.cartItem.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
    },
    removeCart(state, action) {
      const id = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === id);
      state.cartItem.splice(index, 1);
    },
  },
});

const { actions, reducer } = profileSlice;
export const { showMiniCart, hideMiniCart, addToCart, removeCart, setQuantity } = actions;
export default reducer;

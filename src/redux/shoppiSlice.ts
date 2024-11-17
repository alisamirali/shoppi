import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../../types";

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface InitialState {
  cart: ProductData[];
  wishlist: ProductData[];
  userInfo: UserInfo | null;
}

const initialState: InitialState = {
  cart: [],
  wishlist: [],
  userInfo: null,
};

export const shoppingSlice = createSlice({
  name: "shoppi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state?.cart.findIndex(
        (product) => product._id === action.payload._id
      );

      if (existingProduct !== -1) {
        state.cart[existingProduct] = {
          ...state.cart[existingProduct],
          quantity: state.cart[existingProduct].quantity + 1,
        };
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product._id === action.payload
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product._id === action.payload
      );

      if (existingProduct) {
        existingProduct.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.cart = [];
    },
    addToWishlist: (state, action) => {
      //   const existingProduct = state.wishlist.find(
      //     (product) => product._id === action.payload._id
      //   );

      state.wishlist.push(action.payload);
    },
    resetWishlist: (state) => {
      state.wishlist = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart,
  addToWishlist,
  resetWishlist,
  addUser,
  removeUser,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;

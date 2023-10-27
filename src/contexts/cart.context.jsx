
import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

export const CART_ACTION_TYPES = {
  TOGGLE_CART_PREVIEW: 'TOGGLE_CART_PREVIEW',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.TOGGLE_CART_PREVIEW:
      return {
        ...state,
        isCartOpen: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`unknown type of ${type} in cartReducer`)
  }
}

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, return new array with incremented quantity
  if(existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem
    );
  }

  // otherwise, return new array with new item added
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // if quantity is equal to 1, do not include it in the new array
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // return new array with item quantity decremented
  // if we don't return a new array, react won't register the prop changed and won't rerender
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
    ? {...cartItem, quantity: cartItem.quantity - 1} 
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

export const CartProvider = ({children}) => {
  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = 
          useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => 
      total + cartItem.quantity, 0
    );
    const newCartTotal = newCartItems.reduce((total, cartItem) => 
      total + (cartItem.quantity * cartItem.price), 0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      })
    );
  }

  const setIsCartOpen = (status) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_PREVIEW, status));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  // exposed context functions/values for other modules
  const value = {
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart,
    cartItems, 
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

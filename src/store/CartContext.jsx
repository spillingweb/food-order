import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.payload,
        quantity: 1,
      });
    }

    return {
      ...state, // redundant, because we only have an items object
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.id
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  function addItemToCart(item) {
    cartDispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  function updateItemQuantity(id, amount) {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        id,
        amount,
      },
    });
  }

  function clearCart() {
    cartDispatch({
      type: 'CLEAR_CART'
    })
  }

  const ctxValue = {
    cartItems: cartState.items,
    addItemToCart,
    updateItemQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

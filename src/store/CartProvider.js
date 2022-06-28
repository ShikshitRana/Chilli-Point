import CartContext from "./cart-context";
import { useReducer } from "react";

const reducerFn = (state, action) => {
  if (action.type === "ADD") {
    const exisitingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisitingItem = state.items[exisitingItemIndex];
    let updatedItems;
    if (exisitingItem) {
      updatedItems = [...state.items];
      updatedItems[exisitingItemIndex].amount =
        updatedItems[exisitingItemIndex].amount + action.item.amount;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedValue = state.value + action.item.price * action.item.amount;
    return { items: updatedItems, value: updatedValue };
  }

  if (action.type === "REMOVE") {
    const exisitingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingItem = state.items[exisitingItemIndex];
    const updatedValue = state.value - exisitingItem.price;
    let updatedItems;
    if (exisitingItem) {
      updatedItems = [...state.items];
      if (updatedItems[exisitingItemIndex].amount === 1) {
        updatedItems.splice(exisitingItemIndex, 1);
      } else {
        updatedItems[exisitingItemIndex].amount =
          updatedItems[exisitingItemIndex].amount - 1;
      }
    }
    return { items: updatedItems, value: updatedValue };
  }
  if (action.type === "CLEAR") {
    return { items: [], value: 0 };
  }
  return { items: [], value: 0 };
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(reducerFn, {
    items: [],
    value: 0,
  });

  const addItemCart = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemCart = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    value: cartState.value,
    addItem: addItemCart,
    removeItem: removeItemCart,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

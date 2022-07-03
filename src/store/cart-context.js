import { createContext } from "react";

const CartContext = createContext({
  items: [],
  value: 0,
  addItem: ()=>{},
  removeItem: ()=>{},
  clearCart: () => {}
});

export default CartContext;

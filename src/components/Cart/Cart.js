import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);
  const authctx = useContext(AuthContext);

  const itemsCart = ctx.items;
  const value = ctx.value;
  const readyToOrder = itemsCart.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const itemAdd = {
      ...item,
      amount: 1,
    };
    ctx.addItem(itemAdd);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-4c217-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartitems = (
    <ul className={classes["cart-list"]}>
      {itemsCart.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.btnDivOrder}>
      {readyToOrder && (
        <button className={classes.btnOrder} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.btnDiv}>
        <button className={classes.btnClose} onClick={props.modalFunc}>
          X
        </button>
      </div>
      {readyToOrder && cartitems}
      {!readyToOrder && <div className={classes.errorMsg}>Cart is empty</div>}
      {readyToOrder && (
        <div className={classes.amount}>
          <p>Total Amount</p>
          <span>₹ {value}</span>
        </div>
      )}
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.modalFunc} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p className={classes.sendingMsg}>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <div className={classes.btnDiv}>
        <button
          className={[classes.btnClose, classes.btn].join(" ")}
          onClick={props.modalFunc}
        >
          X
        </button>
      </div>
      <p className={classes.sentMsg}>Relax and sit back, your order will be delivered soon :)</p>
    </React.Fragment>
  );

  return (
    <Modal modalFunc={props.modalFunc}>
      {authctx.isLoggedIn && !isSubmitting && !didSubmit && cartModalContent}
      {authctx.isLoggedIn && isSubmitting && isSubmittingModalContent}
      {authctx.isLoggedIn &&
        !isSubmitting &&
        didSubmit &&
        didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
 
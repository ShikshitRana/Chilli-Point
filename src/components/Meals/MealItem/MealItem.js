import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealForm from "./MealForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const ctx = useContext(CartContext);

  const onAddForm = (noofitem) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: noofitem,
    });
  };

  return (
    <div className={classes.meal}>
      <div>
        <p className={classes.name}>{props.name}</p>
        <p className={classes.info}>{props.info}</p>
        <p className={classes.price}>₹ {props.price}</p>
      </div>
      <MealForm onAddForm={onAddForm}></MealForm>
    </div>
  );
};

export default MealItem;
 
import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    props.onAddForm(enteredAmountNumber);
    amountRef.current.value = 0;
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "0",
          step: "1",
          defaultValue: "0",
        }}
      />
      <button><img width="10px" src="images/addcart.png" alt="BigCo Inc. logo" /></button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
    </form>
  );
};

export default MealItemForm;

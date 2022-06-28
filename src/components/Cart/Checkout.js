import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    phone: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneInputRef = useRef();

  //  Form Submit

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredaddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredphone = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredaddressIsValid = !isEmpty(enteredaddress);
    const enteredphoneIsValid = !isEmpty(enteredphone);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredaddressIsValid,
      phone: enteredphoneIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredaddressIsValid &&
      enteredphoneIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
    props.onConfirm({
      name: enteredName,
      address: enteredaddress,
      phone: enteredphone,
      postalCode: enteredPostalCode,
    });
  };

  // adding extra classes

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid
    }`;
  const addressControlClasses = `${classes.control} ${formInputsValidity.address ? "" : classes.invalid
    }`;
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid
    }`;
  const phoneControlClasses = `${classes.control} ${formInputsValidity.phone ? "" : classes.invalid
    }`;

  // return

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="enter your name"
          ref={nameInputRef}
          required
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="enter your full address"
          ref={addressInputRef}
          required
        />
        {!formInputsValidity.address && <p>Please enter a valid address!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Pin Code</label>
        <input
          type="number"
          min="100000"
          max="999999"
          id="postal"
          placeholder="enter your six digits pincode"
          ref={postalCodeInputRef}
          required
        />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (6 characters long)!</p>
        )}
      </div>

      <div className={phoneControlClasses}>
        <label htmlFor="phone">Phone No</label>
        <input
          type="tel"
          id="phone"
          ref={phoneInputRef}
          placeholder="your phone no. without country code"
          pattern="[0-9]{10}"
          required
        />
        {!formInputsValidity.phone && <p>Please enter a valid phone no.!</p>}
      </div>

      <div className={classes.actions}>

        <button
          type="button"
          onClick={props.onCancel}
          className={`${classes.submit} ${classes.cancel}`}
        >
          <div >
            <div >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Cancel</span>
        </button>

        <button className={classes.submit}>
          <div >
            <div >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default Checkout;

import { useState, Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Layout/Header";
import MealsSummary from "./components/Meals/MealsSummary";
import AvailableMeals from "./components/Meals/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AuthForm from "./components/Login/AuthForm";
import PasswordChange from "./components/Login/PasswordChange";
import InvalidUrl from "./components/UI/InvalidUrl";
import Footer from "./components/Layout/Footer";
import AuthContext from "./store/auth-context";
import SignUpModal from "./components/Login/SignUpModal";

function App() {
  const authctx = useContext(AuthContext);
  const [cartState, setcartState] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [msg, setMsg] = useState('');

  const modalState = () => {
    setcartState(false);
  };

  const cartClick = () => {
    setcartState(true);
  };

  const signUpClose = () => {
    setSignUp(false);
  }

  const onSignUp = (msg) => {
    setMsg(msg);
    setSignUp(true);
  }

  return (
    <CartProvider>
      {cartState && <Cart modalFunc={modalState} />}
      {signUp && <SignUpModal signUpClose={signUpClose} message={msg} />}
      <Header cartClick={cartClick} />
      <Routes>
        {!authctx.isLoggedIn && (
          <Route
            path="/"
            element={
              <Fragment>
                <AuthForm onSignUp={onSignUp} />
                <MealsSummary />
                <Footer />
              </Fragment>
            }
          />
        )}
        <Route
          path="/order"
          element={
            <Fragment>
              {authctx.isLoggedIn && (
                <Fragment>
                  <MealsSummary />
                  <AvailableMeals />
                  <Footer />
                </Fragment>
              )}
              {!authctx.isLoggedIn && <Navigate to="/" replace />}
            </Fragment>
          }
        />

        <Route
          path="/passwordchange"
          element={
            <Fragment>
              {authctx.isLoggedIn && <PasswordChange />}
              {!authctx.isLoggedIn && <Navigate to="/" replace />}
            </Fragment>
          }
        />

        <Route path="*" element={<InvalidUrl></InvalidUrl>} />
      </Routes>
    </CartProvider>
  );
}

export default App;

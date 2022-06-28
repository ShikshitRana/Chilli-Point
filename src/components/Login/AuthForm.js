import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

let exportPwd;
const AuthForm = (props) => {
  const authctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const pwdRef = useRef();
  let navigate = useNavigate();
  const [txt, setTxt] = useState("password");
  const [eyeIcon, setIcon] = useState("images/show.png");
  const loginApi = process.env.REACT_APP_LOGIN_API_KEY;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enterEmail = emailRef.current.value;
    const enterPwd = pwdRef.current.value;
    exportPwd = enterPwd;

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${loginApi}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${loginApi}`;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enterEmail,
        password: enterPwd,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Something is wrong";
            if (data && data.error && data.error.message)
              errorMsg = data.error.message;

            props.onSignUp(errorMsg);
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        if (!isLogin) {
          emailRef.current.value = "";
          pwdRef.current.value = "";

          navigate("/", { replace: true });
          setIsLogin((prevState) => !prevState);

          props.onSignUp(
            "Account created successfully, please login to continue"
          );
        } else {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authctx.login(data.idToken, expirationTime.toISOString());
          navigate("/order", { replace: true });
        }
      })
      .catch((err) => props.onSignUp(err.message));
  };

  const showpwd = () => {
    if (txt === "password") {
      setTxt("text");
      setIcon("images/hide.png");
    } else {
      setTxt("password");
      setIcon("images/show.png");
    }
  };

  return (
    <div className={classes.auth}>
      <p className={classes.heading}>{isLogin ? "Login" : "Sign Up"}</p>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="enter your email"
            required
            ref={emailRef}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>

          <div className={classes.pwdDiv}>
            <input
              type={txt}
              id="password"
              placeholder="enter your password"
              required
              ref={pwdRef}
              autoComplete="on"
            />

            <div className={classes.show}>
              <img onClick={showpwd} src={eyeIcon} alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={classes.actions}>
          <button className={classes.loginBtn} type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Not a user? Sign Up." : "Already a user? LogIn."}
          </button>
        </div>
      </form>
    </div>
  );
};

export { exportPwd };
export default AuthForm;

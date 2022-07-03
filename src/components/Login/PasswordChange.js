import { useRef, useContext, useState } from "react";
import classes from "./PasswordChange.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { exportPwd } from "./AuthForm";

const PasswordChange = () => {
  const authctx = useContext(AuthContext);
  const newPwdRef = useRef();
  let navigate = useNavigate();
  const [txt, setTxt] = useState("password");
  const [pwdChange, setPwdChange] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something is wrong");
  const [eyeIcon, setIcon] = useState("images/show.png");
  const loginApi = process.env.REACT_APP_LOGIN_API_KEY;

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    const newPwd = newPwdRef.current.value;
    if (newPwd === exportPwd) {
      setErrorMsg("New password can not be same as old password");
      setPwdChange(true);
      return;
    }
    const temPwd = newPwdRef.current.value;
    if (temPwd.trim().length < 5 || temPwd.trim().length > 13) {
      setErrorMsg("Password length should be between 4 and 12");
      setPwdChange(true);
      return;
    }
    setPwdChange(false);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${loginApi}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authctx.token,
          password: newPwdRef.current.value,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        authctx.logout();
        navigate("/", { replace: true });
      } else {
        return res.json().then((data) => {
          let errorMsg = "Something is wrong";
          if (data && data.error && data.error.message)
            errorMsg = data.error.message;

          setErrorMsg(errorMsg);
          setPwdChange(true);
        });
      }
    });
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
      <p className={classes.heading}>Reset Password</p>
      <form className={classes.form} onSubmit={passwordChangeHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>

          <div className={classes.pwdDiv}>
            <input
              type={txt}
              id="new-password"
              placeholder="enter new password"
              ref={newPwdRef}
              autoComplete="on"
            />
            <div className={classes.show}>
              <img onClick={showpwd} src={eyeIcon} alt="BigCo Inc. logo" />
            </div>
          </div>

          {pwdChange && <p>{errorMsg}</p>}
        </div>
        <div className={classes.actions}>
          <button className={classes.loginBtn} type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;

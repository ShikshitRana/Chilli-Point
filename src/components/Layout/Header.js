import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import HeaderCartButton from "./HeaderCartButton";

import logo from "../../../src/assets/logo.png";
import classes from "./Header.module.css";

const Header = (props) => {
  const authctx = useContext(AuthContext);
  const islogged = authctx.isLoggedIn;
  let navigate = useNavigate();

  const logoutBtn = () => {
    authctx.logout();
    navigate("/", { replace: true });
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.brand}>
          <img className={classes.logo} src={logo} alt="logo" />{" "}
          <h3 className={classes.name}>Chilli Point</h3>
        </div>
        <ul> 
          {islogged && (
            <li>
              <Link
                to="/order"
                className={`${classes.authBtn} ${classes.order}`}
              >
                Order
              </Link>
            </li>
          )}
          {islogged && (
            <li>
              <Link
                to="/passwordchange"
                className={`${classes.authBtn} ${classes.pwd}`}
              >
                Reset Password
              </Link>
            </li>
          )}
          {islogged && (
            <li>
              <button
                onClick={logoutBtn}
                className={classes.logout}
              >
                Logout
              </button>
            </li>
          )}
          {islogged && (
            <li>
              <HeaderCartButton cartClick={props.cartClick} />
            </li>
          )}
        </ul>
      </header>
    </Fragment>
  );
};

export default Header;

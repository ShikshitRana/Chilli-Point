import classes from "./InvalidUrl.module.css";
import errorImg from "../../assets/error.jpg";

const InvalidUrl = () => {
  return (
    <div className={classes.invalid}>
      <h3 className={classes.heading}>Page not found</h3>
      <img className={classes.img} src={errorImg} alt="Page not Found" />
      <p className={classes.para}>Please check the URL and try again.</p>
    </div>
  );
};

export default InvalidUrl;

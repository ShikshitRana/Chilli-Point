import Modal from "../UI/Modal";
import classes from "./SignUpModal.module.css";

const SignUpModal = (props) => {
  const msg = props.message;

  return (
    <Modal modalFunc={props.signUpClose}>
      <p className={classes.msg} >{msg}</p>
    </Modal>
  );
};

export default SignUpModal;

import "./Footer.css";


const Footer = () => {
  return (
    <div className="footer">
      <ul className="footerUL">
        <li className="footerLI">
          <a href="https://www.instagram.com/shikshit_rana/?hl=en">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </li>

        <li>
          <a href="https://twitter.com/shikshit_rana">
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </a>
        </li>

        <li>
          <a href="https://github.com/ShikshitRana">
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/shikshit-rana-798382220/">
            <i className="fab fa-linkedin" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

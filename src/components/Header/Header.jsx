import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Button from "../Button/button";
import { UserContext } from "../../context/context";

function Header() {
  const { user } = useContext(UserContext);
  const HEADER_STYLE = {
    boxShadow: "0 0 5px 0 var(--light-text-color2)",
    zIndex: "10",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    border: "1px solid red",
  };
  return (
    <header style={HEADER_STYLE}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="header-brand">
          <div className="icon">
            <i class="bi bi-file-earmark"></i>
          </div>
          <h1 className="brand-name">
            {" "}
            <em>VANTYSE DOCS</em>{" "}
          </h1>
        </div>
      </Link>
      <div className="login-btn">
        <Link
          className="login-btn-appear-mobile"
          style={{ textDecoration: "none" }}
          to="/auth"
        >
          <Button type="roundedButton" value={user ? "Logout" : "Login"} />
        </Link>
      </div>
    </header>
  );
}

export default Header;

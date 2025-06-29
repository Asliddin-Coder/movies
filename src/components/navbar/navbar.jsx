import { Link, NavLink } from "react-router-dom";
import "./navbar.scss";
import logoText from "/logo-text.svg";
import logo from "/logo.svg";
import { navbar_link } from "../../constants";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
          <img src={logoText} alt="Logo Text" />
        </Link>
      </div>

      <nav className="navbar__menu">
        <ul>
          {navbar_link.map((item) => (
            <li>
              <NavLink
                key={item.route}
                to={item.route}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Books Store</div>
      <ul>
        <li>
          <Link to="/"> Search </Link>
        </li>
        <li>
          <Link to="/collection"> Collection</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

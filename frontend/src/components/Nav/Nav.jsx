import React from "react";
import "./Nav.scss";

function Nav() {
  return (
    <header>
      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            <li className="nav-list__item nav-list__item--active">yoga</li>
            <li className="nav-list__item">water</li>
            <li className="nav-list__item">meditation</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;

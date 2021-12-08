import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import close from "../../assets/icons/remove.svg";

const Nav = ({ closeNav, habitList }) => {
  return (
    <div className="sidebar">
      <img
        className="close close--nav"
        src={close}
        alt="close modal"
        onClick={closeNav}
      />
      <ul className="nav">
        {habitList.map((habit) => (
          <li key={habit.id} className="nav__item" onClick={closeNav}>
            <NavLink to={`/${habit.name}`} className="nav__link">
              {habit.name}
            </NavLink>
          </li>
        ))}
        <li key="pomodoro" className="nav__item" onClick={closeNav}>
          <NavLink to="/pomodoro" className="nav__link nav__link--pomodoro">
            pomodoro
          </NavLink>
        </li>
        <li key="add" className="nav__item" onClick={closeNav}>
          <NavLink to="/new" className="nav__link nav__link--add">
            add new
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;

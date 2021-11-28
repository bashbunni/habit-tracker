import React from "react";
import { NavLink } from "react-router-dom";
import "./Modal.scss";
import close from "../../assets/icons/remove.svg";

const Modal = ({ closeModal, habitList }) => {
  return (
    <div className="modal">
      <img
        className="modal__close"
        src={close}
        alt="close modal"
        onClick={closeModal}
      />
      <ul className="modal__list">
        {habitList.map((habit) => (
          <li key={habit.id} className="modal__item">
            <NavLink to={`/${habit.name}`} className="modal__link">
              {habit.name}
            </NavLink>
          </li>
        ))}
        <li key="pomodoro" className="modal__item">
          <NavLink to="/pomodoro" className="modal__link modal__link--pomodoro">
            pomodoro
          </NavLink>
        </li>
        <li key="add" className="modal__item">
          <NavLink to="/new" className="modal__link modal__link--add">
            add new
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Modal;

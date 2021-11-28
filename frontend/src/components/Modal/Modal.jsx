import React from "react";
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
          <li key={habit} className="modal__item">
            <a href={habit} className="modal__link">
              {habit}
            </a>
          </li>
        ))}
        <li key="pomodoro" className="modal__item">
          <a href="#" className="modal__link modal__link--pomodoro">
            pomodoro
          </a>
        </li>
        <li key="add" className="modal__item">
          <a href="#" className="modal__link modal__link--add">
            add new
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Modal;

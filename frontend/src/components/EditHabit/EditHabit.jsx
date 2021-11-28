import React from "react";
import close from "../../assets/icons/remove.svg";
import "./EditHabit.scss";

const EditHabit = ({ habit, setEditOpen }) => {
  return (
    <div className="edit-habit">
      <img
        className="add-activity__close"
        src={close}
        alt="close"
        onClick={() => {
          setEditOpen(false);
        }}
      />
      <form className="form">
        <h1 className="form__title">Edit Habit</h1>
        <label className="form__label" htmlFor="name">
          habit name
        </label>
        <input
          className="form__input"
          name="name"
          id="name"
          type="text"
          placeholder="yoga"
          value={habit.name}
        />
        <label className="form__label" htmlFor="unit">
          unit of measure
        </label>
        <input
          className="form__input"
          name="unit"
          id="unit"
          type="text"
          placeholder="hours"
          value={habit.unit}
        />
        <label className="form__label" htmlFor="why">
          why
        </label>
        <input
          className="form__input"
          name="why"
          id="why"
          type="text"
          placeholder="I want to do yoga because..."
          value={habit.why}
        />
        <div className="form__btn-container">
          <button className="form__btn">save</button>
          <button className="form__btn--reset">cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditHabit;

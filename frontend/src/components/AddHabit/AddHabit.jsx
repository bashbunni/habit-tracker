import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import close from "../../assets/icons/remove.svg";
import "./AddHabit.scss";

const AddHabit = ({ setHabitList, habitList }) => {
  const [habit, setHabit] = useState({});
  const history = useHistory();

  const addHabit = () => {
    window.backend
      .NewHabit(habit.id, habit.name, habit.unit, habit.pomodoro, habit.why)
      .then((response) => {
        console.log(response);
        window.backend.Habits.AddHabit(JSON.stringify(response));
      });
  };

  return (
    <div className="add-habit">
      <img
        className="add-habit__close"
        src={close}
        alt="close"
        onClick={() => <Redirect to="/" />}
      />
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addHabit();
          setTimeout(() => {
            alert("habit added!");
            history.push(`/${habit.name}`);
          }, 2000);
        }}
      >
        <h1 className="form__title">Add Habit</h1>
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
          onChange={(e) => setHabit({ ...habit, name: e.target.value })}
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
          onChange={(e) => setHabit({ ...habit, unit: e.target.value })}
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
          onChange={(e) => setHabit({ ...habit, why: e.target.value })}
        />
        <div className="form__btn-container">
          <button className="form__btn" type="submit">
            save
          </button>
          <button
            className="form__btn--reset"
            onClick={() => history.push("/")}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit;

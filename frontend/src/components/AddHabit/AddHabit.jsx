import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddHabit.scss";

const AddHabit = ({ updateHabits }) => {
  const [habit, setHabit] = useState({});
  const history = useHistory();

  const addHabit = () => {
    window.backend
      .NewHabit(habit.id, habit.name, habit.unit, habit.pomodoro, habit.why)
      .then((response) => {
        console.log(typeof response);
        window.backend.MySQLHabitRepository.AddHabitFromJSON(JSON.stringify(response));
      });
    updateHabits();
    history.push(`/`);
  };

  return (
    <div className="add-habit">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addHabit();
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

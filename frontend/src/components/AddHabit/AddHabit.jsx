import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isValidName, isValidForm } from "../../validation.js";
import "./AddHabit.scss";

const AddHabit = ({ updateHabits, habitList }) => {
  const [habit, setHabit] = useState({});
  const history = useHistory();

  const addHabit = () => {
    window.backend
      .NewHabit(habit.id, habit.name, habit.unit, habit.pomodoro, habit.why)
      .then((response) => {
        window.backend.MySQLRepository.AddHabitFromJSON(
          JSON.stringify(response)
        )
          .then(() => {
            updateHabits();
            history.push(`/${habit.name}`);
          })
          .catch((err) => console.error(err));
      });
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
        <h1 className="form__title--add-habit">Add Habit</h1>
        <label className="form__label" htmlFor="name">
          habit name
        </label>
        <input
          className={
            isValidName(habit.name, habitList)
              ? "form__input"
              : "form__input form__input--error"
          }
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
          className={
            habit.unit ? "form__input" : "form__input form__input--error"
          }
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
          className={
            habit.why ? "form__input" : "form__input form__input--error"
          }
          name="why"
          id="why"
          type="text"
          placeholder="I want to do yoga because..."
          onChange={(e) => setHabit({ ...habit, why: e.target.value })}
        />
        <div className="form__btn-container">
          {isValidForm(habit, habitList) ? (
            <button className="form__btn" type="submit">
              save
            </button>
          ) : (
            <button
              className="form__btn form__btn--error"
              type="submit"
              disabled={true}
            >
              invalid form
            </button>
          )}
          <button
            className="form__btn form__btn--reset"
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

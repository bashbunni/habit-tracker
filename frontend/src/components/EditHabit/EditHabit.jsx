import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isValidName, isValidForm } from "../../validation.js";
import close from "../../assets/icons/remove.svg";
import "./EditHabit.scss";

const EditHabit = ({
  habit,
  setHabit,
  setEditOpen,
  updateHabits,
  habitList,
}) => {
  const [tempHabit, setTempHabit] = useState(habit);
  const history = useHistory();

  const deleteHabit = () => {
    window.backend.MySQLRepository.DeleteHabit(habit.id).catch((err) =>
      console.error(err)
    );
    updateHabits();
    history.push("/");
  };

  const EditHabit = () => {
    window.backend.MySQLRepository.EditHabitFromJSON(JSON.stringify(tempHabit))
      .then(() => {
        updateHabits();
        history.push(`/${tempHabit.name}`);
        setEditOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit-habit">
      <img
        className="close"
        src={close}
        alt="close"
        onClick={() => {
          setEditOpen(false);
        }}
      />
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          EditHabit();
          setHabit({
            name: tempHabit.name,
            unit: tempHabit.unit,
            why: tempHabit.why,
          });
        }}
      >
        <h1 className="form__title">Edit Habit</h1>
        <label className="form__label" htmlFor="name">
          habit name
        </label>
        <input
          className={
            isValidName(tempHabit.name, habitList)
              ? "form__input"
              : "form__input form__input--error"
          }
          name="name"
          id="name"
          type="text"
          placeholder="yoga"
          value={tempHabit.name}
          onChange={(e) => setTempHabit({ ...tempHabit, name: e.target.value })}
        />
        <label className="form__label" htmlFor="unit">
          unit of measure
        </label>
        <input
          className={
            tempHabit.unit ? "form__input" : "form__input form__input--error"
          }
          name="unit"
          id="unit"
          type="text"
          placeholder="hours"
          value={tempHabit.unit}
          onChange={(e) => setTempHabit({ ...tempHabit, unit: e.target.value })}
        />
        <label className="form__label" htmlFor="why">
          why
        </label>
        <input
          className={
            tempHabit.why ? "form__input" : "form__input form__input--error"
          }
          name="why"
          id="why"
          type="text"
          placeholder="I want to do yoga because..."
          value={tempHabit.why}
          onChange={(e) => setTempHabit({ ...tempHabit, why: e.target.value })}
        />
        <div className="form__btn-container">
          {isValidForm(tempHabit, habitList) ? (
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
            onClick={(e) => {
              e.preventDefault();
              setEditOpen(false);
            }}
          >
            cancel
          </button>
          <button className="form__btn form__btn--delete" onClick={deleteHabit}>
            delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHabit;

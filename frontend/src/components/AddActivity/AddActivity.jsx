import React from "react";
import "./AddActivity.scss";

import close from "../../assets/icons/remove.svg";
import "./AddActivity.scss";

const AddActivity = ({ habit_id, unit, setAddOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let today = new Date().toISOString().slice(0, 10);
    window.backend
      .NewDate(today, Number(e.target.count.value), habit_id)
      .then((response) => {
        console.log(response);
        window.backend.MySQLRepository.AddCountFromJSON(
          JSON.stringify(response)
        ).catch((err) => {
          console.error(err);
        });
      });
  };

  return (
    <div className="add-activity">
      <img
        className="add-activity__close"
        src={close}
        alt="close"
        onClick={() => {
          setAddOpen(false);
        }}
      />
      <h1>Log Activity</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="count">How many {unit} did you complete?</label>
        <input
          className="form-field"
          type="number"
          id="count"
          name="count"
          min="1"
        />
        <div className="form__btn-container">
          <button className="form__btn" type="submit">
            submit
          </button>
          <button
            className="form__btn form__btn--reset"
            onClick={(e) => {
              e.preventDefault();
              setAddOpen(false);
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddActivity;

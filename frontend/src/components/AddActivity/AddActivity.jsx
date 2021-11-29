import React from "react";
import "./AddActivity.scss";

import close from "../../assets/icons/remove.svg";
import "./AddActivity.scss";

const AddActivity = ({ unit, setAddOpen }) => {
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
      <form className="form">
        <label htmlFor="count">How many {unit} did you complete?</label>
        <input
          className="form-field"
          type="number"
          id="count"
          name="count"
          min="1"
        />
        <div className="form__btn-container">
          <button className="form__btn">submit</button>
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

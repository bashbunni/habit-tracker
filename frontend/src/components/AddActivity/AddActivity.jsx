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
        <label for="count">How many {unit} did you complete?</label>
        <input
          className="form-field"
          type="number"
          id="count"
          name="count"
          min="1"
        />
        <button className="form__btn">submit</button>
        <button className="form__btn--reset">reset</button>
      </form>
    </div>
  );
};

export default AddActivity;

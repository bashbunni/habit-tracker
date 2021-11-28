import React from "react";
import close from "../../assets/icons/remove.svg";
import "./AddActivity.scss";

const AddActivity = ({ unitOfMeasure, setAddOpen }) => {
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
        <label className="form__label" htmlFor="activity">
          Number of {unitOfMeasure}
        </label>
        <input name="form__input" type="number" required />
        <button className="form__btn">submit</button>
        <button className="form__btn--reset">reset</button>
      </form>
    </div>
  );
};

export default AddActivity;

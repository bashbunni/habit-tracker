import React from "react";
import "./AddActivity.scss";

const AddActivity = () => {
  return (
    <>
      <h2 className="add-activity__title">
        Congrats on another step closer to your goal!!!
      </h2>
      <form className="form">
        <label for="count">How many *UOMs* did you complete?</label>
        <input
          className="form-field"
          type="number"
          id="count"
          name="count"
          min="1"
        />
      </form>
    </>
  );
};

export default AddActivity;

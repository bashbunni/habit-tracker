import React from "react";
import mockPomodoro from "../../assets/images/mock-pomodoro.png";
import "./Pomodoro.scss";

const Pomodoro = () => {
  const timeRemaining = "10 minutes 58 seconds";
  const quote = {
    text: "Logic will get you from A to Z; imagination will get you everywhere.",
    author: "Albert Einstein",
  };

  return (
    <div className="pomodoro">
      <h2 className="pomodoro__title">pomodoro</h2>
      <p className="pomodoro__status">
        <span className="highlight">Time Left: </span>
        {timeRemaining}
      </p>
      <img className="pomodoro__image" src={mockPomodoro} alt="pomodoro" />
      <div className="pomodoro__bottom">
        <blockquote className="pomodoro__quote">
          <p>
            "{quote.text}"<br />-{quote.author}
          </p>
        </blockquote>
        <div className="pomodoro__buttons">
          <div className="pomodoro__btn pomodoro__btn--reset">reset</div>
          <div className="pomodoro__btn pomodoro__btn--start">start</div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;

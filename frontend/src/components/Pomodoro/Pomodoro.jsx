import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import mockPomodoro from "../../assets/images/mock-pomodoro.png";
import "./Pomodoro.scss";

const Pomodoro = () => {
  const [quote, setQuote] = useState({});
  const timeRemaining = "10 minutes 58 seconds";
  let mountedRef = useRef(true);

  useEffect(() => {
    axios.get("https://type.fit/api/quotes").then(({ data }) => {
      if (mountedRef.current) {
        let random = Math.floor(Math.random() * data.length);
        setQuote(data[random]);
      }
    });
    return () => (mountedRef.current = false);
  }, []);

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

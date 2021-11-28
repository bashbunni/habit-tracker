import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import edit from "../../assets/icons/btn--edit.png";
import add from "../../assets/icons/btn--add.png";
import mockPomodoro from "../../assets/images/mock-pomodoro.png";
import AddActivity from "../AddActivity";
import EditHabit from "../EditHabit";
import "./Habit.scss";

const today = new Date();

const Habit = () => {
  // state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // mock data
  const habit = {
    name: "yoga",
    why: "I want to do yoga every day so that I can be more relaxed",
    unit: "hours",
  };
  const timeRemaining = "10 minutes 58 seconds";
  const quote = {
    text: "Logic will get you from A to Z; imagination will get you everywhere.",
    author: "Albert Einstein",
  };

  // helpers
  const randomValues = getRange(364).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(0, 3),
    };
  });
  return (
    <div className="habit">
      {addOpen ? (
        <AddActivity unit={habit.unit} setAddOpen={setAddOpen} />
      ) : null}
      {editOpen ? <EditHabit habit={habit} setEditOpen={setEditOpen} /> : null}
      <div className="habit__header">
        <h1 className="habit__title">{habit.name}</h1>
        <img
          className="habit__icon"
          src={edit}
          alt="edit habit"
          onClick={() => {
            setEditOpen(true);
          }}
        />
        <img
          className="habit__icon"
          src={add}
          alt="add activity"
          onClick={() => {
            setAddOpen(true);
          }}
        />
      </div>
      <div className="habit__about">
        <div className="why">
          <h3 className="why__title">why</h3>
          <p className="why__text">{habit.why}</p>
        </div>
        <div className="goal">
          <h3 className="goal__title">goal:</h3>
          <div className="goal__list">
            <p className="goal__choice">daily</p>
            <p className="goal__choice">weekly</p>
            <p className="goal__choice goal__choice--active">custom</p>
          </div>
        </div>
      </div>
      <CalendarHeatmap
        startDate={shiftDate(today, -364)}
        endDate={today}
        values={randomValues}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)}: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={true}
      />

      <ReactTooltip />
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
    </div>
  );
};

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Habit;

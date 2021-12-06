import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import edit from "../../assets/icons/btn--edit.png";
import add from "../../assets/icons/btn--add.png";
import AddActivity from "../AddActivity";
import EditHabit from "../EditHabit";
import Pomodoro from "../Pomodoro";
import "./Habit.scss";

const today = new Date().toISOString().substring(0, 10);

const Habit = ({ habitList, updateHabits }) => {
  const url = window.location.pathname.split("/").pop();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [habit, setHabit] = useState({});
  const [dates, setDates] = useState([]);

  const defaultValues = getRange(364).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: 0,
    };
  });

  const getDates = () => {
    window.backend.MySQLRepository.GetAllDates(habit.id).then((response) => {
      Array.prototype.push.apply(defaultValues, response);
      setDates(defaultValues);
    });
  };

  useEffect(() => {
    setHabit(habitList[0]);
  }, [habitList]);

  // runs on start and when habit updates
  useEffect(() => {
    if (habit && habit.id) {
      getDates();
    }
  }, [habit]);

  useEffect(() => {
    const myHabit = habitList.find((habit) => habit.name === url);
    if (myHabit !== undefined) {
      setHabit(myHabit);
    }
  }, [url, habitList]);

  return (
    <>
      {habit && (
        <div className="habit">
          {addOpen && (
            <AddActivity
              habit_id={habit.id}
              unit={habit.unit}
              setAddOpen={setAddOpen}
            />
          )}
          {editOpen && (
            <EditHabit
              habit={habit}
              setHabit={setHabit}
              setEditOpen={setEditOpen}
              updateHabits={updateHabits}
              habitList={habitList}
            />
          )}
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
          {dates && (
            <CalendarHeatmap
              startDate={shiftDate(today, -363)}
              endDate={today}
              values={dates}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-github-${value.count}`;
              }}
              tooltipDataAttrs={(value) => {
                return {
                  "data-tip": `${value.date}: ${value.count} ${habit.unit}`,
                };
              }}
              showWeekdayLabels={true}
            />
          )}
          <ReactTooltip />
          <Pomodoro />
        </div>
      )}
    </>
  );
};

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate.toISOString().substring(0, 10);
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Habit;

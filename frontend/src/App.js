import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "./components/Modal";
import Habit from "./components/Habit";
import Pomodoro from "./components/Pomodoro";
import AddHabit from "./components/AddHabit";
import hamburger from "./assets/icons/hamburger.svg";
import "./App.scss";

const App = () => {
  const [habitList, setHabitList] = useState([]);
  const [navModal, setNavModal] = useState(false);
  const openNav = () => setNavModal(true);
  const closeNav = () => setNavModal(false);
  const mountedRef = useRef(true);

  function updateHabits() {
    window.backend.Habits.GetHabits().then((response) => {
      setHabitList(response);
    });
  }

  useEffect(() => {
    if (mountedRef.current) {
      updateHabits();
    }
    return () => (mountedRef.current = false);
  }, []);

  return (
    <div className="app">
      {habitList && (
        <div className="container">
          <img
            className="hamburger"
            src={hamburger}
            alt="open menu"
            onClick={openNav}
          />
          <Router>
            <Switch>
              {navModal ? (
                <Modal closeModal={closeNav} habitList={habitList} />
              ) : null}
              <Route path="/pomodoro" exact component={Pomodoro} />
              <Route
                path="/new"
                exact
                render={(props) => (
                  <AddHabit setHabitList={setHabitList} habitList={habitList} />
                )}
              />
              <Route
                path="/:name"
                render={(props) => <Habit habitList={habitList} />}
              />
              <Route
                path="/"
                exact
                render={(props) => <Habit habitList={habitList} updateHabits={updateHabits} />}
              />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;

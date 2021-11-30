import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    window.backend.GetHabits().then((response) => {
      console.log(response);
      setHabitList(response);
    });
  }, []);

  return (
    <div className="app">
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
              render={(props) => <Habit habitList={habitList} />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;

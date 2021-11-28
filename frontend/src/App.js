import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "./components/Modal";
import Habit from "./components/Habit";
import Pomodoro from "./components/Pomodoro";
import hamburger from "./assets/icons/hamburger.svg";
import "./App.scss";

const App = () => {
  const [habitList, setHabitList] = useState([
    {
      id: 1,
      name: "yoga",
      unit: "hours",
      why: "I want to do yoga so I can be more relaxed",
    },
    {
      id: 2,
      name: "meditation",
      unit: "15 minutes",
      why: "I want to meditate so I can be more present",
    },
    {
      id: 3,
      name: "hydration",
      unit: "litres",
      why: "I want to be hydrated so I can feel better",
    },
  ]);
  const [navModal, setNavModal] = useState(false);
  const openNav = () => setNavModal(true);
  const closeNav = () => setNavModal(false);

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
              path="/:id"
              render={(props) => <Habit habitList={habitList} />}
            />
            <Route path="/" exact component={Habit} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;

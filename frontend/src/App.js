import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Habit from "./pages/Habit";
import Pomodoro from "./components/Pomodoro";
import AddHabit from "./components/AddHabit";
import hamburger from "./assets/icons/hamburger.svg";
import "./App.scss";

const App = () => {
  const [habitList, setHabitList] = useState([]);
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);
  const mountedRef = useRef(true);

  function updateHabits() {
    window.backend.MySQLRepository.GetAllHabits().then((response) => {
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
            onClick={nav ? closeNav : openNav}
          />
          <Router>
            {nav && <Nav closeNav={closeNav} habitList={habitList} />}

            <Switch>
              <Route path="/pomodoro" exact component={Pomodoro} />
              <Route
                path="/new"
                exact
                render={() => (
                  <AddHabit updateHabits={updateHabits} habitList={habitList} />
                )}
              />
              <Route
                path="/:name"
                render={() => (
                  <Habit habitList={habitList} updateHabits={updateHabits} />
                )}
              />
              <Route
                path="/"
                exact
                render={() => (
                  <Habit habitList={habitList} updateHabits={updateHabits} />
                )}
              />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;

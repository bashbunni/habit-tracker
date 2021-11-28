import React, { useState } from "react";
import Modal from "./components/Modal";
import Habit from "./components/Habit";
import hamburger from "./assets/icons/hamburger.svg";
import "./App.scss";

const App = () => {
  const [habitList, setHabitList] = useState(["yoga", "meditation", "water"]);
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
        {navModal ? <Modal closeModal={closeNav} habitList={habitList} /> : null}
        <Habit />
      </div>
    </div>
  );
};

export default App;

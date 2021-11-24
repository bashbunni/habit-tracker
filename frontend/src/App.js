import React, { useState } from "react";
import Modal from "./components/Modal";
import Habit from "./components/Habit";
import hamburger from "./assets/icons/hamburger.svg";
import "./App.scss";

const App = () => {
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
        {navModal ? <Modal closeModal={closeNav} /> : null}
        <Habit />
        <h1>Habit Tracker</h1>
      </div>
    </div>
  );
};

export default App;

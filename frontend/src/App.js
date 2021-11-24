import React, { useState } from "react";
import "./App.scss";
import Modal from "./components/Modal";

const App = () => {
  const [navModal, setNavModal] = useState(true);
  const closeNav = () => setNavModal(false);

  return (
    <div className="App">
      {navModal ? <Modal closeModal={closeNav} /> : null}
      <h1>Habit Tracker</h1>
    </div>
  );
};

export default App;

/*App.js*/
import React, { useState, useEffect } from "react";
import "./App.css";
import Panel from "./Panel";
import TestStock from "./TestStock";

function App() {

  return (
      <div className="App">
        <Panel/>
        <TestStock/>
      </div>
  );
}
export default App
import React from "react";
import { useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "@vibe/core/tokens";
import { CurvaSView } from "./components/CurvaSView";

const monday = mondaySdk();

const App = () => {
  useEffect(() => {
    // Notifica Monday que app está pronto
    monday.execute("valueCreatedForUser");
  }, []);

  return (
    <div className="App">
      <CurvaSView />
    </div>
  );
};

export default App;

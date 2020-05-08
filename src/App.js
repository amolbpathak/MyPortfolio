import React from "react";
import "./styles.css";
import VerticalBarChart from "./component/barCharts/VerticalBarChart";
import Scale from "./component/Scale";
import HorizontalBarChart from "./component/barCharts/HorizontalBarChart";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <HorizontalBarChart />
      <Scale />
      <VerticalBarChart />
    </div>
  );
}

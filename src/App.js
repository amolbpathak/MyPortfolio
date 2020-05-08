import React from "react";
import "./styles.css";
import BarChart from "./component/barCharts/BarChart";
import Scale from "./component/Scale";
import BarChartV1 from "./component/barCharts/BarChartV1";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <BarChartV1 />
      <Scale />
      <BarChart />
    </div>
  );
}

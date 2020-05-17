import React from "react";
import "./styles.css";
import ZoomableSunburst from "./component/paiCharts/ZoomableSunburst";
// import LineChartTooltip from "./component/lineCharts/LineChartTooltip";
import LineChartInlineLable from "./component/lineCharts/LineChartInlineLable.js";
import PaiChart from "./component/paiCharts/PaiChart";
import GroupBarChart from "./component/barCharts/GroupBarChart";

export default function App() {
  return (
    <div className="App">
      <section>
        <ZoomableSunburst />
        <LineChartInlineLable />
      </section>
      <section>
        <GroupBarChart />
        <PaiChart />
      </section>
    </div>
  );
}

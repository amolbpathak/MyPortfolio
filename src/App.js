import React from "react";
import "./styles.css";
import ZoomableSunburst from "./component/paiCharts/ZoomableSunburst";
import LineChartTooltip from "./component/lineCharts/LineChartTooltip";
import LineChartInlineLable from "./component/lineCharts/LineChartInlineLable.js";

export default function App() {
  return (
    <div className="App">
      <section>
        <ZoomableSunburst />
        <LineChartInlineLable />
      </section>
      <section>
        <LineChartTooltip />
      </section>
    </div>
  );
}

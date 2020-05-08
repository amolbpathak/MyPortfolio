import React, { Component } from "react";
import * as d3 from "d3";

class HorizontalBarChart extends Component {
  componentDidMount() {
    const data = [4, 8, 15, 16, 23, 42, 10];
    this.drawBarChart(data);
  }

  drawBarChart(data) {
    const div = d3
      .select(this.refs.div)
      .append("div")
      .style("font", "10px sans-serif")
      .style("text-align", "right")
      .style("color", "white");

    div
      .selectAll("div")
      .data(data)
      .join("div")
      .style("background", "steelblue")
      .style("padding", "3px")
      .style("margin", "1px")
      .style("width", d => `${d * 10}px`)
      .text(d => d);
  }

  render() {
    return <div ref="div" />;
  }
}

export default HorizontalBarChart;

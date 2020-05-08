import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  componentDidMount() {
    let data = [2, 4, 2, 6, 8];
    this.createBarChart(data);
  }

  createBarChart(data) {
    const canvasWidth = 600;
    const canvaHeight = 400;
    const scale = 20;
    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvaHeight)
      .style("border", "1px solid black");

    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", d => d * scale)
      .attr("fill", "orange")
      .attr("x", (d, i) => i * 45)
      .attr("y", d => canvaHeight - d * scale);

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 40 + 10)
      .attr("y", (d, i) => canvaHeight - d * scale - 10)
      .text(d => d);
  }
  render() {
    return <div ref="canvas" />;
  }
}
export default BarChart;

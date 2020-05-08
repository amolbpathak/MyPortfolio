import React, { Component } from "react";
import * as d3 from "d3";
import data from "/public/AlfaFreq.json";

class HorizontalBarChartV1 extends Component {
  componentDidMount() {
    this.drawBarChart(data);
  }

  drawBarChart(data) {
    const height = 500;
    const width = 954;
    const margin = { top: 20, right: 0, bottom: 30, left: 40 };

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.frequency)])
      .range([height - margin.bottom, margin.top]);

    let x = d3
      .scaleBand()
      .domain(data.map(d => d.letter))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    const alfaChart = d3
      .select(this.refs.alfaBarChart)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    alfaChart
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    alfaChart
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    const yTitle = g =>
      g
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("y", 10)
        .text("↑ Frequency");

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "%"))
        .call(g => g.select(".domain").remove());

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    alfaChart
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.letter))
      .attr("y", d => y(d.frequency))
      .attr("height", d => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());

    alfaChart.append("g").call(xAxis);

    alfaChart.append("g").call(yAxis);

    alfaChart.call(yTitle);
  }
  render() {
    return <div ref="alfaBarChart" />;
  }
}

export default HorizontalBarChartV1;

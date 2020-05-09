import React, { Component } from "react";
import * as d3 from "d3";
import myData from "../../data/BarChart.json";

class HorizontalBarChart extends Component {
  componentDidMount() {
    const data = [4, 8, 15, 16, 23, 42, 10];
    this.drawBarChart(data);
    this.drawSvgBarChart(myData);
  }

  drawSvgBarChart(data) {
    const width = 420;
    console.log(data);
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, width]);

    let y = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, 20 * data.length]);

    const svgBar = d3
      .select(this.refs.svgBar)
      .append("svg")
      .style("border", "1px solid black")
      .attr("width", width)
      .attr("height", y.range()[1])
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("text-anchor", "end");

    const bar = svgBar
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0,${y(d.name)})`);

    bar
      .append("rect")
      .attr("fill", "steelblue")
      .attr("width", d => x(d.value))
      .attr("height", y.bandwidth() - 1);

    bar
      .append("text")
      .attr("fill", "white")
      .attr("x", d => x(d.value) - 3)
      .attr("y", y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => d.value);
  }

  drawBarChart(data) {
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

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
      .style("width", d => `${x(d)}px`)
      .text(d => d);
  }

  render() {
    return (
      <div>
        <div ref="div" />
        <div ref="svgBar" />
      </div>
    );
  }
}

export default HorizontalBarChart;

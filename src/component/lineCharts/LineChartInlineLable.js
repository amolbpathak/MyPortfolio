import React, { Component } from "react";
import * as d3 from "d3";
import data from "../../data/apples-bananas.tsv";

class LineChartInlineLable extends Component {
  componentDidMount() {
    const fruitData = d3.tsvParse(
      data,
      d => ((d3.autoType(d).date = new Date(Date.UTC(d.date, 0, 1))), d)
    );
    this.drawInlineLableLineChart(fruitData);
  }

  drawInlineLableLineChart(data) {
    console.log(data);
    const height = 500;
    const width = 500;
    const labelPadding = 3;
    const margin = { top: 30, right: 50, bottom: 30, left: 30 };

    const x = d3
      .scaleUtc()
      .domain([data[0].date, data[data.length - 1].date])
      .range([margin.left, width - margin.right]);

    const series = data.columns
      .slice(1)
      .map(key => data.map(({ [key]: value, date }) => ({ key, date, value })));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
      .range([height - margin.bottom, margin.top]);

    const z = d3.scaleOrdinal(data.columns.slice(1), d3.schemeCategory10);

    const xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    const svg = d3
      .select(this.refs.inlineLable)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("border", "1px solid black");

    svg.append("g").call(xAxis);

    const serie = svg
      .append("g")
      .selectAll("g")
      .data(series)
      .join("g");

    serie
      .append("path")
      .attr("fill", "none")
      .attr("stroke", d => z(d[0].key))
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(d => x(d.date))
          .y(d => y(d.value))
      );

    serie
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(d => d)
      .join("text")
      .text(d => d.value)
      .attr("dy", "0.35em")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.value))
      .call(text =>
        text
          .filter((d, i, data) => i === data.length - 1)
          .append("tspan")
          .attr("font-weight", "bold")
          .text(d => ` ${d.key}`)
      )
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 6);
  }

  render() {
    return <div ref="inlineLable" />;
  }
}

export default LineChartInlineLable;

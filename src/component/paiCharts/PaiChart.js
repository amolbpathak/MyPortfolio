import React, { Component } from "react";
import * as d3 from "d3";
import data from "../../data/PaiChart.json";

class PaiChart extends Component {
  componentDidMount() {
    this.drawPaiChart(data);
  }

  drawPaiChart(data) {
    const width = 1000;
    const height = Math.min(width, 450);

    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(
        d3.quantize(
          t =>
            d3.interpolateRgbBasis([
              "rgb(217, 56, 119)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(130, 87, 217)"
            ])(t),
          data.length
        )
      );

    const arcs = pie(data);

    const svg = d3
      .select(this.refs.paiChart)
      .append("svg")
      .attr("viewBox", [-width / 3, -height / 1.5, width, height * 1.25])
      .style("border", "1px solid black");

    svg
      .append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 15)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => {
        const _d = arc.centroid(d);
        if (d.endAngle - d.startAngle <= 0.35) {
          _d[0] *= 2.2;
          _d[1] *= 2.2;
        } else {
          _d[0] *= 1.7;
          _d[1] *= 1.7;
        }
        return `translate(${_d})`;
      })
      .call(text =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .attr("fill", d =>
            d.endAngle - d.startAngle <= 0.35 ? color(d.data.name) : "#fff"
          )
          .text(d => d.data.value)
      )
      .call(text =>
        text
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .attr("fill", d =>
            d.endAngle - d.startAngle <= 0.35 ? color(d.data.name) : "#fff"
          )
          .text(
            d =>
              ~~(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 10000) / 100 +
              "%"
          )
      );

    var legendRectSize = 10;
    var legendSpacing = 6;
    var enteringLabels = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter();

    var lg = enteringLabels
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = (height * color.domain().length) / 2;
        var horz = 28 * legendRectSize;
        var vert = i * height - offset;
        return "translate(" + horz + "," + vert + ")";
      });

    lg.append("rect")
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .style("fill", i => {
        if (typeof i === "number") {
          data[i + 1].color = color(i);
        }
        console.log(data);
        return color(i);
      })
      .style("stroke", color);

    var labelGroups = enteringLabels
      .append("g")
      .attr("class", "label")
      .data(arcs);
    var lines = labelGroups
      .append("line")
      .attr("x1", function(d, i) {
        console.log(d, arcs[d]);
        const _d = arc.centroid(d);
        return _d[0];
      })
      .attr("y1", function(d) {
        const _d = arc.centroid(d);
        return _d[1];
      })
      .attr("x2", function(d) {
        const _d = arc.centroid(d);
        const midAngle = Math.atan2(_d[1], _d[0]);
        return Math.cos(midAngle) * 240;
      })
      .attr("y2", function(d) {
        const _d = arc.centroid(d);
        const midAngle = Math.atan2(_d[1], _d[0]);
        return Math.sin(midAngle) * 240;
      })
      .attr("class", "label-line")
      .attr("stroke", function(d, i) {
        return color(i - 1);
      })
      .filter(d => {
        const _d = arc.centroid(d);
        return d.endAngle - d.startAngle > 0.35;
      })
      .attr("style", "display: none;");

    console.log(lines, labelGroups);
    /**/
    lg.append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize)
      .text(function(d) {
        return d;
      });
  }

  render() {
    return <div ref="paiChart" />;
  }
}

export default PaiChart;

import React, { Component } from "react";
import * as d3 from "d3";

class Scale extends Component {
  componentDidMount() {
    this.createScale();
  }

  createScale() {
    const temperatureData = [8, 5, 13, 9, 12];
    d3.select(this.refs.myDiv).style("background-color", "blue");
    d3.select(this.refs.myList)
      .append("li")
      .text("banana");

    d3.select(this.refs.temperatures)
      .selectAll("h2")
      .data(temperatureData)
      .enter()
      .append("h2")
      .text(datapoint => `${datapoint} degrees`)
      .style("color", datapoint => {
        if (datapoint > 10) {
          return "red";
        } else {
          return "blue";
        }
      });

    d3.selectAll(this.refs.circle)
      .transition()
      .duration(750)
      .delay(iteration => iteration * 10)
      .attr("r", dataPoint => {
        Math.sqrt(dataPoint * 10);
      });
  }

  render() {
    // return <svg ref={node => (this.node = node)} width={500} height={500} />;
    return (
      <div>
        <div ref="myDiv">Test</div>
        <ol ref="myList" />
        <div ref="temperatures" />
        <p />
        <div ref="circle" />
      </div>
    );
  }
}

export default Scale;

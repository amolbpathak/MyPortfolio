import React, { Component } from "react";
import ContentfulClient from "./ContentfulClient";

const PortfolioContext = React.createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: []
    };
  }
  componentDidMount() {
    console.log("inside context provider");
    ContentfulClient.getEntries({
      content_type: "nobook",
      order: "fields.tranNumber"
    })
      .then(response =>
        this.setState({
          portfolio: response.items
        })
      )
      .catch(err => console.log("Error" + err));
  }

  formatData(portfolio) {
    portfolio.map(p => {
      let data = { ...p.fields };
      console.log("data: " + JSON.stringify(data));
      return data;
    });
  }

  render() {
    console.log("My Portfolio " + this.state.portfolio);
    this.formatData(this.state.portfolio);
    return (
      <PortfolioContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </PortfolioContext.Provider>
    );
  }
}

const PortfolioConsumer = PortfolioContext.Consumer;

export { ContextProvider, PortfolioConsumer, PortfolioContext };

import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class About extends Component {
  componentDidMount() {
    browserHistory.push('/about');
  }
  render() {
    return (
      <div id="about">
        This is the about page.
      </div>
    );
  }
}

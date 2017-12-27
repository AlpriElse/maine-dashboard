import React from 'react';

import Calendar from '../home/calendar';
import Clock from '../home/clock';
import Schedule from '../home/schedule';
import Countdown from '../home/countdown';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      schedule: {}
    };
  }
  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div>
          <h1>This is home.</h1>
        </div>
        <Clock />
        <Countdown />
        <Schedule />
        <Calendar />
      </div>
    )
  }
}

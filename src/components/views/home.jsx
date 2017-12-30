import React from 'react';
import moment from 'moment';

import getSchedule from '../utility/getSchedule.js';
import Calendar from '../home/calendar';
import Clock from '../home/clock';
import Schedule from '../home/schedule';
import Countdown from '../home/countdown';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleLoaded: false,
      time: "",
      schedule: {}
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      var time = moment().format("hh:mm:ss A");
      this.setState({
        time: time
      })
    }, 1000);

    var url = "api/schedule";
    getSchedule(schedule => {
      this.setState({
        scheduleLoaded: true,
        schedule: schedule
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderContent() {
    if (this.state.scheduleLoaded) {
      return (
        <div>
          <Clock
            time={this.state.time}/>
          <Countdown
            schedule={this.state.schedule}/>
          <Schedule
            schedule={this.state.schedule}/>
          <Calendar />
        </div>
      )
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div>
          <h1>This is home.</h1>
        </div>
        {
          this.renderContent()
        }
      </div>
    )
  }
}

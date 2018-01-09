import React from 'react';
import moment from 'moment';

import getSchedule from '../utility/getSchedule.js';
import Schedule from '../home/schedule';

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
    return (
      <div>
        <Schedule
          schedule={this.state.schedule}/>
      </div>
    )
  }

  render() {
    return (
      <div className="home-background">
        <br />
        <br />
        {
          this.renderContent()
        }
      </div>
    )
  }
}

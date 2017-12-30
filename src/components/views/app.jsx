import React from "react";
import moment from 'moment';

import Navbar from './navbar';
import getSchedule from '../utility/getSchedule';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: {},
      scheduleLoaded: false,
      time: moment().format("hh:mm:ss A")
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      var time = moment().format("hh:mm:ss A");
      this.setState({
        time: time
      })
    }, 1000);

    getSchedule(schedule => {
      this.setState({
        scheduleLoaded: true,
        schedule: schedule
      });
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Navbar
          scheduleLoaded={this.state.scheduleLoaded}
          schedule={this.state.schedule}
          time={this.state.time}/>
        {this.props.children}
      </div>
    );
  }
}

import React from "react";
import moment from 'moment';

import Navbar from './navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: {},
      scheduleLoaded: false,
      time: ""
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      var time = moment().format("hh:mm:ss A");
      this.setState({
        time: time
      })
    }, 1000);

    var url = "api/schedule";
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(schedule => {
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

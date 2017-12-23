import React, { Component } from 'react';




class App extends Component {
  constructor(props) {
    super(props);
    this.parseSchedule = this.parseSchedule.bind(this);
  }

  parseSchedule() {
    // Parses the schedule
    var schedule = require('./data/schedules.json');
    // console.log("Schedule Parsed!");
    // Gets the starting first period hour of a regular day
    // var time = JSON.stringify(schedule['regular'][1]['start']);
    // var hour = parseInt(time/60);
    // var minute = parseInt(time%60);
    // var text = <p>{hour}:{minute}</p>
    // return <p>{hour}:{minute}</p>
    console.log(schedule);

  }
  render() {
    return <div>{this.parseSchedule()}</div>
  }
}

export default App;

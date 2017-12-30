import React from 'react';
import moment from 'moment';
export default class Navbar extends React.Component {
  generateSpecials() {
    var schedule = this.props.schedule;
    var scheduleLoaded = this.props.scheduleLoaded;
    if (scheduleLoaded) {
      var schedule = this.props.schedule;
      var currentEvent = {};
      var nextEvent = {};

      schedule.events.forEach(event => {
        var start = moment(event.start, "HH:mm");
        var end = moment(event.end, "HH:mm");
        var isNow = moment().isBetween(start,end);
        var isBefore = moment().isBefore(start);

        if(isNow) {
          currentEvent = event;
        }
        if(isBefore) {
          if (nextEvent.name != undefined) {
            var prevStart = moment(nextEvent.start, "HH:mm");
            var diff = moment().diff(start);
            var prevDiff = moment().diff(prevStart);
            if (diff > 0 && diff < prevDiff) {
              nextEvent = event;
            }
          } else {
            nextEvent = event;
          }
        }

      });

      var message = "";
      if (currentEvent.name) {
        var end = moment(currentEvent.end, "HH:mm");
        message = currentEvent.name + " ends " + moment().to(end);
      } else if (nextEvent.name) {
        var start = moment(nextEvent.start, "HH:mm");
        message = nextEvent.name + " starts " + moment().to(start);
      } else {
        message = "No more events for the day."
      }
      return (
        <div>
          <span>{this.props.time}</span><br />

          <span>{message}</span>
        </div>
      )
    } else {
      return (
        <div>
          <span>Loading...</span>
        </div>
      )
    }
  }
  render() {
    var visible = true;
    var specials = this.generateSpecials();
    return (
      <nav className="navbar navbar-dark sticky-top navbar-expand-md bg-dark justify-content-between">
        <div className="navbar-collapse collapse dual-nav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link pl-0" href="#">Home <span className="sr-only">Home</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Extracurricular</a>
                </li>
            </ul>
        </div>
        <div className="navbar-brand abs-center-x text-center">
          <a href="/" >Maine Dashboard</a><br />
          {specials}
        </div>
        <div className="navbar-collapse collapse dual-nav">
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">Login</li>
            </ul>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
            <span className="navbar-toggler-icon"></span>
        </button>
    </nav>
    )
  }
}

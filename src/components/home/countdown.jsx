import React from 'react';
import moment from 'moment';

export default class Countdown extends React.Component {
  render() {
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
        nextEvent = event;
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
        <h2>{message}</h2>
      </div>
    )
  }
}

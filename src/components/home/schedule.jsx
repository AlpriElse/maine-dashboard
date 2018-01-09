import React from 'react';
import moment from 'moment';

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {}
    }
  }
  componentWillReceiveProps() {
    var schedule = this.props.schedule;
    if (schedule.name != null) {
      var eventsArr = schedule.events.map(event => {
        var start = moment(event.start, "HH:mm").format("hh:mm");
        var end = moment(event.end, "HH:mm").format("hh:mm");
        var time = start + " - " + end;
        return (
          <tr key={"event_" + event.name}>
            <td>{time}</td>
            <td>{event.name}</td>
          </tr>
        )

      })
      this.setState({
        events: eventsArr
      });
    }

  }
  render() {
    if (this.state.events.length > 0) {
      return (
        <div className="col-sm-12 col-md-8 offset-md-2 text-center schedule">
          <h2>{this.props.schedule.name}</h2>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Event</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.events
              }

            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="col-sm-12 col-md-8 offset-md-2 text-center">
          <h2>Loading schedule...</h2>
        </div>
      )
    }

  }
}

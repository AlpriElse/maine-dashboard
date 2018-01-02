import React from 'react';
import moment from 'moment';

export default class EventsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  componentWillReceiveProps() {
    var events = this.props.events;
    events.sort((a, b) => {
      var startA = moment(a.start, "HH:mm");
      var startB = moment(b.start, "HH:mm");
      if(startA.isBefore(startB)) {
        return -1;
      } else {
        return 1;
      }
    });

    var eventsArr = events.map(event => {
      var start = moment(event.start, "HH:mm").format("hh:mm");
      var end = moment(event.end, "HH:mm").format("hh:mm");
      var time = start + " - " + end;
      var key = "event_" + event.name + start + end
      return (
        <tr key={key}>
          <td>{time}</td>
          <td>{event.name}</td>
          <td><button type="button" name={key} className="btn btn-danger" onClick={this.props.handleDeleteEvent}>Delete Event</button></td>
        </tr>
      )

    });

    this.setState({
      events: eventsArr
    });
  }

  render() {
    return (
      <table className="table text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Event</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.events
          }

        </tbody>
      </table>
    )

  }
}

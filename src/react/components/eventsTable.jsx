import React from 'react';

export default class EventsTable extends React.Component {
  componentDidMount() {
    var events = this.props.events;

    var eventArr = events.map(event => {
      var start = moment(event.start, "HH:mm").format("hh:mm");
      var end = moment(event.end, "HH:mm").format("hh:mm");
      var time = start + " - " + end;
      return (
        <tr key={"event_" + event.name}>
          <td>{time}</td>
          <td>{event.name}</td>
        </tr>
      )

    });

    this.setState({
      events: eventsArr
    });
  }
  render() {
    return (
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
    )

  }
}

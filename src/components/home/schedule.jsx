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
          <tr>
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
        <div>
          <h2>This is a schedule</h2>
          <table>
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
        <div>
          <h2>This is a schedule</h2>
        </div>
      )
    }

  }
}

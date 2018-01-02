import React from 'react';
import firebase from '../utility/firebase';
import EventsTable from '../components/eventsTable';
import moment from 'moment';

export default class ScheduleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleName: "",
      events: new Array()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var schedulesRef = firebase.database().ref('schedules');
    var schedule = {
      name: this.state.scheduleName,
      events: this.state.events
    }
    schedulesRef.push(schedule);
    console.log("Data Sent.");
    console.log(schedule);
    this.setState({
      scheduleName: "",
      events: []
    });
  }

  handleNewEvent() {
    this.state.events.push({
      name: this.state.newEvent,
      start: this.state.newStartTime,
      end: this.state.newEndTime
    });
    this.setState({
      newEvent: "",
      newStartTime: "",
      newEndTime: ""
    });
  }

  handleDeleteEvent(e) {
    var key = e.target.name;
    var events = this.state.events;
    var index = -1;
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var start = moment(event.start, "HH:mm").format("hh:mm");
      var end = moment(event.end, "HH:mm").format("hh:mm");
      var currKey = "event_" + event.name + start + end;
      if (currKey == key) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      events.splice(index, 1);
    }
    this.setState({
      events: events
    });
  }

  render() {

    return (
      <div>
        <br />
        <br />
        <div className="card col-8 offset-md-2">
          <div className="card-body">
            <h3 className="card-title text-center">Schedule Editor</h3>
            <br />
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row container">
                  <label htmlFor="scheduleName" className="col-md-4 col-form-label text-center">Schedule Name</label>
                  <input type="text"
                    className="form-control col-md-8"
                    id="scheduleName"
                    placeholder="Regular Day Schedule"
                    onChange={this.handleChange}
                    value={this.state.scheduleName}/>
                </div>

                <EventsTable
                  events={this.state.events}
                  handleDeleteEvent={this.handleDeleteEvent}/>

                <br /><br /><br />
                <div className="container form-row">
                  <div className="form-group col-md-4 offset-md-2">
                    <label htmlFor="newStartTime" className="col-form-label text-center">Start Time</label>
                    <input type="text"
                      className="form-control col-md-12"
                      id="newStartTime"
                      placeholder="11:00"
                      onChange={this.handleChange}
                      value={this.state.newStartTime}/>
                  </div>
                  <div className="form-group col-md-4">
                  <label htmlFor="newEndTime" className="col-form-label text-center">End Time</label>
                    <input type="text"
                      className="form-control col-md-12"
                      id="newEndTime"
                      placeholder="23:00"
                      onChange={this.handleChange}
                      value={this.state.newEndTime}/>
                  </div>
                </div>
                <div className="form-group form-row container">
                  <label htmlFor="newEvent" className="col-md-4 offset-md-2 col-form-label text-center">Event Name</label>
                  <input type="text"
                    className="form-control col-md-4"
                    id="newEvent"
                    placeholder="Period 1"
                    onChange={this.handleChange}
                    value={this.state.newEvent} />
                </div>
                <button type="button" className="btn btn-primary btn-block col-6 offset-md-3" onClick={this.handleNewEvent}>Add Event</button>
                <br /><br />
                <button type="submit" className="btn btn-primary btn-block btn-lg">Add Schedule</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

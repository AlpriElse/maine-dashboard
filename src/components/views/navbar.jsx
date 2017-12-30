import React from 'react';
import moment from 'moment';
import genCountdownMessage from '../utility/genCountdownMessage';

export default class Navbar extends React.Component {
  generateSpecials() {
    var schedule = this.props.schedule;
    var scheduleLoaded = this.props.scheduleLoaded;
    if (scheduleLoaded) {
      var message = genCountdownMessage(schedule);
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

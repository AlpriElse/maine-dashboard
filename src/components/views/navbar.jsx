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
          <span className="time">{this.props.time}</span><br />

          <span className="message">{message}</span>
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
      <nav className="navbar sticky-top navbar-expand-md justify-content-between navbar-custom">
        <div className="navbar-collapse collapse dual-nav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link pl-0" href="/">Home <span className="sr-only">Home</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/comingSoon">Extracurricular</a>
                </li>
            </ul>
        </div>
        <div className="abs-center-x text-center">
          <a className="navbar-brand" href="/" ><span className="navbar-brand-primary">MAINE</span><span className="navbar-brand-secondary">DASHBOARD</span></a><br/>
          <span className="navbar-text">
          {specials}
          </span>
        </div>
        <div className="navbar-collapse collapse dual-nav">
            <ul className="nav navbar-nav ml-auto">
                <li><a href="/comingSoon" className="btn btn-outline-light" role="button">Login</a></li>
            </ul>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
            <span className="navbar-toggler-icon"></span>
        </button>
    </nav>
    )
  }
}

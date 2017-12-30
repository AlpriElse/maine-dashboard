import React from 'react';
import moment from 'moment';

export default class Clock extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.time}</h2>
      </div>
    )
  }
}

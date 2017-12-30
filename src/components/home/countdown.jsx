import React from 'react';
import moment from 'moment';
import genCountdownMessage from '../utility/genCountdownMessage';

export default class Countdown extends React.Component {
  render() {

    var message = genCountdownMessage(this.props.schedule)
    return (
      <div>
        <h2>{message}</h2>
      </div>
    )
  }
}

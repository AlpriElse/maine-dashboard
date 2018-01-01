import React from 'react';
import firebase, { auth, provider } from '../utility/firebase.js';

export default class Login extends React.Component {
  login() {

  }

  render() {
    return (
      <div>
        <br /> <br/>
        <div className="card col-4 offset-md-4 text-center">
          <div className="card-body">
            <h3 className="card-title">Login</h3>
            <br />
            <form>
              <div className="form-group row">
                <label htmlFor="email" className="col-md-4 col-form-label">Email</label>
                <input type="email" className="form-control col-md-8" id="email" aria-describedby="emailHelp" placeholder="example@gmail.com"/>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-md-4 col-form-label">Password</label>
                <input type="password" className="form-control col-md-8" id="password" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants.js';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignupMuTation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMuTation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
class Login extends Component {
  state = {
    login: true, // switch between login/signup
    email: '',
    password: '',
    name: '',
  }

  onValueChange = (type, e)  => {
    this.setState({
      [type]: e.target.value
    });
  }

  _confirm = async (data) => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { login, email, password, name } = this.state;

    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={e => this.onValueChange('name', e)}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            value={email}
            onChange={e => this.onValueChange('email', e)}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.onValueChange('password', e)}
            type="password"
            placeholder={
              login ? 'Your password' : 'Choose a safe password'
            }
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, name, password }}
            onCompleted={(data) => this._confirm(data)}
          >
            {mutation => (
              <div type="button" className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'Create Account'}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

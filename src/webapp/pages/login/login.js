import React, { Component } from 'react';
import classnames from 'classnames';
import { InputField } from 'react-components/input-field';
import { SubmitButton } from 'react-components/submit-button';
import { Link } from 'react-router-dom';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: ''
    }
  }

  sendRequest = e => {
    e.preventDefault(); 
    this.props.fetchUserData({ name: this.state.name, password: this.state.password });
  }

  setName = e => {
    this.setState({ name: e.target.value });
  }

  setPassword = e => {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <form className={ classnames() }>
        <InputField
          label={ 'Login' }
          inputId={ 'login' }
          type={ 'text' }
          placeholder={ 'Enter your login' }
          name={ 'login' }
          changeValue={ this.setName }
        />
        <InputField
          label={ 'Password' }
          inputId={ 'password' }
          type={ 'password' }
          placeholder={ 'Enter your password' }
          changeValue={ this.setPassword }
        />
        <SubmitButton
          value={ 'Submit' }
          sendRequest={ this.sendRequest }
        />
        <Link to='/calendar'>Home</Link>
      </form>
    )
  }
}

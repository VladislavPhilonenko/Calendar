import React, { Component } from 'react';
import classnames from 'classnames';
import { InputField } from 'react-components/input-field';
import { SubmitButton } from 'react-components/submit-button';

export class Login extends Component {
  state = {
    name: '',
    password: ''
  }

  sendRequest = e => {
    e.preventDefault();
    
    const { name, password } = this.state;

    this.props.fetchUserData({ name, password });
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
      </form>
    )
  }
}

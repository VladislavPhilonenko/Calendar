import React, { Component } from 'react';
import { AddTaskElem } from '../add-task-elem';
import { SubmitButton } from 'react-components/submit-button';
import './header.css';

export class Header extends Component {
  state = {
    isAddTaskElementOpened: false
  }

  showAddTaskElement = () => {
    this.setState({ isAddTaskElementOpened: true })
  }

  hideAddTaskElement = e => {
    e.preventDefault();
    this.setState({ isAddTaskElementOpened: false })
  }

  logOut = () => {
    sessionStorage.clear();
    this.props.navigateToLoginPage();
  }

  render() {
    return (
      <div className="calendar-header">
        {
          this.state.isAddTaskElementOpened
            ? <AddTaskElem
                closeAddTaskForm={ this.hideAddTaskElement }
              />
            : <SubmitButton
                styles={ 'add-task' }
                value={ 'Add Task' }
                sendRequest={ this.showAddTaskElement }
              />
        }
        <div className="user-data">
          <h3 className="login-title">You are logged in as { this.props.userName }</h3>
          <SubmitButton
            styles={ 'log-out' }
            value={ 'Log Out' }
            sendRequest={ this.logOut }
          />
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import { AddTaskElem } from '../add-task-elem';
import './header.css';

export class Header extends Component {
  state = {
    isAddTaskElemOpened: false
  }

  showAddTaskElem = () => {
    this.setState({ isAddTaskElemOpened: true })
  }

  hideAddTaskElem = () => {
    this.setState({ isAddTaskElemOpened: false })
  }

  logOut = () => {
    sessionStorage.clear();
    this.props.navigateToLoginPage();
  }

  render() {
    return (
      <div className="calendar-header">
        {
          this.state.isAddTaskElemOpened
            ? (
                <div>
                  <button onClick={ this.hideAddTaskElem }>X</button>
                  <AddTaskElem />
                </div>
              )
            : <button onClick={ this.showAddTaskElem }>Add Task</button>
        }
        <span>{ this.props.userName }</span>
        <button onClick={ this.logOut }>Log Out</button>
      </div>
    )
  }
}

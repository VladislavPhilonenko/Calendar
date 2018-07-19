import React, { Component } from 'react';
import { InputField } from 'react-components/input-field';
import { SubmitButton } from 'react-components/submit-button';
import './add-task-elem.css';

export class AddTaskElem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      start: '',
      duration: ''
    }
  }

  sendRequest = e => {
    e.preventDefault();

    this.props.addTask({
      id: this.props.userId,
      task: {
        id: Date.now(),
        title: this.state.title, 
        start: this.state.start, 
        duration: this.state.duration
      } 
    });
  }

  setTitle = e => {
    this.setState({ title: e.target.value });
  }

  setStart = e => {
    this.setState({ start: e.target.value });
  }

  setDuration = e => {
    this.setState({ duration: e.target.value });
  }

  render() {
    return (
      <form>
        <InputField
          label={ 'Title' }
          inputId={ 'title' }
          type={ 'text' }
          placeholder={ 'Enter task name' }
          changeValue={ this.setTitle }
        />
        <InputField
          label={ 'Start time' }
          inputId={ 'startTime' }
          type={ 'text' }
          placeholder={ 'Set start time' }
          changeValue={ this.setStart }
        />
        <InputField
          label={ 'Duration' }
          inputId={ 'duration' }
          type={ 'text' }
          placeholder={ 'Set duration' }
          changeValue={ this.setDuration }
        />
        <SubmitButton
          value={ 'Add Task' }
          sendRequest={ this.sendRequest }
        />
      </form>
    )
  }
}
import React, { Component } from 'react';
import { InputField } from 'react-components/input-field';
import { RangeField } from 'react-components/range-field';
import { SubmitButton } from 'react-components/submit-button';
import './add-task-elem.css';

export class AddTaskElem extends Component {
  state = {
    title: '',
    start: '0',
    duration: '10',
    shouldShowError: false,
    errorMessage: '',
  }

  sendRequest = e => {
    e.preventDefault();

    const {
      title,
      start,
      duration
    } = this.state;
    const validationMessage = this.validateEnteredData();

    if (validationMessage === 'valid') {
      this.props.addTask({
        id: this.props.userId,
        task: {
          id: Date.now(),
          title, 
          start, 
          duration
        } 
      });
      this.setState({ 
        shouldShowError: false,
        errorMessage: '' 
      });
    } else {
      this.setState({ 
        shouldShowError: true,
        errorMessage: validationMessage 
      });
    }
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

  transformStartTimeIntoTimeFormat = minutes => {
    const minutesWithStartTime = 480 + +minutes;

    return `${ minutesWithStartTime / 60 ^ 0 } h ${ minutesWithStartTime % 60 } min`;
  }

  transformDurationIntoTimeFormat = minutes => `${ minutes / 60 ^ 0 } h ${ minutes % 60 } min`;

  validateEnteredData = () => {
    const {
      title,
      start,
      duration
    } = this.state;
    const finishTime = +start + +duration;

    return !title.trim()
      ? 'You didn\'t enter title, please, fill this field'
      : finishTime > 540
        ? 'The task ends after 5 pm, please, change task\'s start or duration'
        : 'valid';
  }

  render() {
    const {
      start,
      duration,
      shouldShowError,
      errorMessage
    } = this.state;

    return (
      <form className="add-task-form">
        <InputField
          label={ 'Title' }
          inputId={ 'title' }
          placeholder={ 'Enter task name' }
          changeValue={ this.setTitle }
        />
        <RangeField
          label={ 'Start Time: ' }
          displayedValue={ this.transformStartTimeIntoTimeFormat(start) }
          value={ start }
          min={ '0' }
          max={ '530' }
          step={ '5' }
          changeValue={ this.setStart }
        />
        <RangeField
          label={ 'Duration: ' }
          displayedValue={ this.transformDurationIntoTimeFormat(duration) }
          value={ duration }
          max={ '540' }
          min={ '10' }
          step={ '5' }
          changeValue={ this.setDuration }
        />
        <SubmitButton
          styles={ 'add-task-form-button' }
          value={ 'Cancel' }
          sendRequest={ this.props.closeAddTaskForm }
        />
        <SubmitButton
          styles={ 'add-task-form-button' }
          value={ 'Add Task' }
          sendRequest={ this.sendRequest }
        />
        {
          shouldShowError
            ? <div className="error-message">{ errorMessage }</div>
            : null 
        }
      </form>
    )
  }
}

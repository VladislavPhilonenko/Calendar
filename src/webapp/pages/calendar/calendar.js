import React, { Component } from 'react';
import { HalfDayElem } from './components/half-day-elem';
import { Header } from './components/header';
import './calendar.css';

const AM_TIME = [
  {
    hour: '8.00',
    halfAnHour: '8.30'
  },
  {
    hour: '9.00',
    halfAnHour: '9.30'
  },
  {
    hour: '10.00',
    halfAnHour: '10.30'
  },
  {
    hour: '11.00',
    halfAnHour: '11.30'
  },
  {
    hour: '12.00',
    halfAnHour: '12.30'
  }
]

const PM_TIME = [
  {
    hour: '1.00',
    halfAnHour: '1.30'
  },
  {
    hour: '2.00',
    halfAnHour: '2.30'
  },
  {
    hour: '3.00',
    halfAnHour: '3.30'
  },
  {
    hour: '4.00',
    halfAnHour: '4.30'
  },
  {
    hour: '5.00'
  }
]

export class Calendar extends Component {
  componentDidMount() {
    if (!this.props.amTasks.length && !this.props.pmTasks.length) {
      const userId = sessionStorage.getItem('id');

      this.props.fetchUserDataById(userId);
    }
  }

  deleteUserTask = taskId => {
    this.props.deleteTask({ 
      id: this.props.userId, 
      taskId 
    });
  }

  render() {
    const {
      userName,
      navigateToLoginPage,
      amTasks,
      pmTasks
    } = this.props;
    
    return (
      <div>
        <Header 
          userName={ userName }
          navigateToLoginPage={ navigateToLoginPage }
        />
        <div className="calendar-main">
          <HalfDayElem
            time={ AM_TIME }
            tasks={ amTasks }
            deleteTask={ this.deleteUserTask }
          />
          <HalfDayElem 
            time={ PM_TIME }
            tasks={ pmTasks }
            deleteTask={ this.deleteUserTask }
          />
        </div>
      </div>
    )
  }
}

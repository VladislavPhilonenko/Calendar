import React from 'react';
import './half-day-elem.css';

export const HalfDayElem = ({
  time,
  tasks,
  deleteTask
}) => (
  <div className="half-day-elem">
    <div className="times">
      {
       time.map((item, i) => (
          item.halfAnHour
          ? (
              <div key={ i } className="one-hour-elem">
                <div className="start-hour">{ item.hour }</div>
                <div className="half-past-hour">{ item.halfAnHour }</div>
              </div>
            )
          : (
              <div key={ i } className="one-hour-elem">
                <div className="start-hour">{ item.hour }</div>
              </div>
            )
       ))
      }
    </div>
    <ul className="tasks">
      { tasks.map(task => (
          <li 
            key={ task.id }
            title={ task.title }
            className="task" 
            style={ {
              height: task.duration, 
              width: task.width, 
              marginLeft: task.marginLeft, 
              marginTop: task.start
            } }>
              <h3 className="task-title">{ task.title }</h3>
              {
                task.title
                ? (
                    <button 
                      className="delete-task-button" 
                      onClick={ () => deleteTask(task.id) }
                    >
                      X
                    </button>
                  )
                : null
              }
          </li>
        ))
      }
    </ul>
  </div>
)

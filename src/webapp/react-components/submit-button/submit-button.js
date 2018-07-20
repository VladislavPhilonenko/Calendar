import React from 'react';
import classnames from 'classnames';
import './submit-button.css';

export const SubmitButton = ({
  styles,
  value,
  sendRequest
}) => {
  return (
    <button 
      className={ classnames('submit-button', styles) } 
      onClick={ sendRequest }
    >
      { value }
    </button>
  )
};

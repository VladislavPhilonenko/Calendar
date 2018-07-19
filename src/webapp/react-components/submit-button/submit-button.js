import React from 'react';
import classnames from 'classnames';
import './submit-button.css';

export const SubmitButton = ({
  value,
  sendRequest
}) => {
  return (
    <button 
      className={ classnames() } 
      onClick={ sendRequest }
    >
      { value }
    </button>
  )
};

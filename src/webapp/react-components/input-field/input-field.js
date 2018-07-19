import React from 'react';
import classnames from 'classnames';
import './input-field.css';

export const InputField = ({
  label = false,
  inputId,
  type,
  placeholder,
  min,
  max,
  changeValue
}) => {
  return (
    <div className={ classnames() }>
      { label && 
          <label 
            className={ classnames() }
            htmlFor={ inputId }
          >{ label }</label>
      }
      <input
        className={ classnames() }
        type={ type }
        id={ inputId }
        placeholder={ placeholder }
        minLength={ min }
        maxLength={ max }
        onChange={ changeValue }  
      />
    </div>
  )
}
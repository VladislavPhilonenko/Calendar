import React from 'react';
import './input-field.css';

export const InputField = ({
  label = false,
  inputId,
  type = 'text',
  placeholder,
  min,
  max,
  changeValue
}) => {
  return (
    <div className="input-field-from-group">
      { label && 
          <label 
            className="input-field-title"
            htmlFor={ inputId }
          >
            { label }
          </label>
      }
      <input
        className="input-field"
        type={ type }
        id={ inputId }
        placeholder={ placeholder }
        min={ min }
        max={ max }
        onChange={ changeValue }  
      />
    </div>
  )
};

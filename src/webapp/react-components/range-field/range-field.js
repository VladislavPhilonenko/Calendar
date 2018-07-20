import React from 'react';
import './range-field.css';

export const RangeField = ({
  label,
  displayedValue,
  value,
  min,
  max,
  step,
  changeValue
}) => {
  return (
    <div className="range-field-form-group">
      <label className="range-field-label">{ label }</label>
      <span className="range-field-displayed-value">{ displayedValue }</span>
      <input 
        className="range-field" 
        type="range"
        value={ value } 
        min={ min }
        max={ max }
        step={ step }
        onChange={ changeValue }
      />
    </div>
  )
};

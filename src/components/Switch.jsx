import React from 'react';

export const Switch = ({
  id = 'bauble_check',
  checked = false,
  onChange,
  className = '',
  style = {}
}) => {
  return (
    <div className={`bauble_box ${className}`} style={style}>
      <input
        className="bauble_input"
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="bauble_label" htmlFor={id}>
        Toggle
      </label>
    </div>
  );
};

export default Switch;

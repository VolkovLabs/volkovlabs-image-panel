import React from 'react';

const actual = jest.requireActual('@grafana/ui');

/**
 * Mock Select component
 */
const Select = jest.fn(({ options, onChange, value, isMulti, ...restProps }) => {
  return (
    <select
      onChange={(event: any) => {
        if (onChange) {
          if (isMulti) {
            onChange(options.filter((option: any) => event.target.values.includes(option.value)));
          } else {
            onChange(options.find((option: any) => option.value === event.target.value));
          }
        }
      }}
      /**
       * Fix jest warnings because null value.
       * For Select component in @grafana/ui should be used null to reset value.
       */
      value={value === null ? '' : value?.value || value}
      multiple={isMulti}
      {...restProps}
    >
      {options.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

module.exports = {
  ...actual,
  Select,
};

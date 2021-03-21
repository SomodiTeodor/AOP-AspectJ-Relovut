import React from "react";

type Props = {
  name: string;
  placeholder: string;
  value: string;
  onSelect(event: React.SyntheticEvent<HTMLSelectElement, Event>): void;
  disabled?: boolean;
  required?: boolean;
  children?: React.ReactNode;
  formClassName?: string;
};

const SelectInput = (props: Props) => {
  let inputClassnames = `form-control `;
  let formClassNames = `form-group ${
    props.formClassName !== undefined ? props.formClassName : ""
  }`;

  return (
    <div className={formClassNames}>
      <select
        className={inputClassnames}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onSelect}
        disabled={props.disabled}
        required={props.required}
      >
        {props.children}
      </select>
    </div>
  );
};

export default SelectInput;

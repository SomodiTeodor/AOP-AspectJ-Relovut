import React, { ChangeEvent } from "react";

type Props = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  info?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  formClassName?: string;
};

const TextInput = (props: Props) => {
  let inputClassnames = `form-control ${props.error ? "is-invalid" : ""}`;
  let formClassNames = `form-group ${
    props.formClassName !== undefined ? props.formClassName : ""
  }`;

  return (
    <div className={formClassNames}>
      <input
        type={props.type}
        className={inputClassnames}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default TextInput;

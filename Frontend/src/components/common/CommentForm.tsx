import React, { useState, CSSProperties } from "react";

type Props = {
  onSubmit(message: string): any;
  style?: CSSProperties;
  className?: string;
};

const CommentForm = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  return (
    <div style={props.style} className={props.className}>
      <form
        className="col-sm-12"
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit(message);
        }}
      >
        <div className="form-group row px-3">
          <label htmlFor="messageinput" className=".col-form-label col-sm-2">
            Message
          </label>
          <textarea
            className="form-control col-sm-10"
            id="messageinput"
            onChange={e => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 text-right">
            <button className="btn btn-primary col-md-2 col-sm-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

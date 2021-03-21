import React, { useState } from "react";

export type ReviewFormData = {
  title: string;
  message: string;
  rating: number;
};

type ReviewFormProps = {
  onSubmit(title: string, message: string, rating: number): any;
};

const ReviewForm = (props: ReviewFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit(title, message, rating);
        }}
      >
        <div className="form-group row">
          <label htmlFor="titleinput" className=".col-form-label col-sm-2">
            Title
          </label>
          <input
            className="form-control col-sm-10"
            id="titleinput"
            type="text"
            onChange={e => setTitle(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group row">
          <label htmlFor="messageinput" className=".col-form-label col-sm-2">
            Text
          </label>
          <textarea
            className="form-control col-sm-10"
            id="messageinput"
            onChange={e => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group row">
          <label htmlFor="ratinginput" className=".col-form-label col-sm-2">
            Rating
          </label>
          <input
            className="form-control col-sm-2"
            id="ratinginput"
            type="number"
            min="0"
            max="100"
            onChange={e => setRating(parseInt(e.target.value))}
            required
          ></input>
          <div className="col-sm-8 text-right">
            <button className="btn btn-primary col-md-2 col-sm-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;

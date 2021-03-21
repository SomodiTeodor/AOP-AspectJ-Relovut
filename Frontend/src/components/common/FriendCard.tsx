import React from "react";
import { Friend } from "../../redux/types/userTypes";

type Props = {
  showAddButton?: boolean;
  friend: Friend;
  addFriend(email: string): any;
  removeFriend(email: string): any;
};

const FriendCard = (props: Props) => {
  return (
    <div className="p-3 row" style={{ maxWidth: 550 }}>
      <div className="col-md-10">
        <p className="m-0">
          <strong>Account:</strong> <span>{props.friend.accountId}</span>
        </p>
        <p className="m-0">
          <strong>Email:</strong> <span>{props.friend.email}</span>
        </p>
        <p className="m-0">
          <strong>Name:</strong> <span>{props.friend.fullname}</span>
        </p>
      </div>
      <div className="col-md-2 text-right">
        {props.showAddButton && (
          <button
            className="btn btn-success"
            onClick={event => {
              event.stopPropagation();
              props.addFriend(props.friend.email);
            }}
          >
            <h5 className="m-0 p-0">+</h5>
          </button>
        )}
        {!props.showAddButton && (
          <button
            className="btn btn-danger"
            onClick={event => {
              event.stopPropagation();
              props.removeFriend(props.friend.email);
            }}
          >
            <h5 className="m-0 p-0">-</h5>
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;

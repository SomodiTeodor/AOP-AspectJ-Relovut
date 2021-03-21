import React from "react";
import { Transaction } from "../../redux/types/transactionTypes";
import "../../scss/TransactionCard.scss";
import moment from "moment";

type Props = {
  transaction: Transaction;
  currentUserEmail: string;
};

const TransactionCard = (props: Props) => {
  let { transaction, currentUserEmail } = props;
  const isAddFunds: boolean = transaction.fromUser === null;
  const isIncoming: boolean =
    !isAddFunds && transaction.toUser.email === currentUserEmail;
  const isOutgoing: boolean = !isAddFunds && !isIncoming;

  let currencyIsoName: string = "";
  if (isAddFunds) currencyIsoName = transaction.toUser.account.currency.isoName;
  else if ((isIncoming || isOutgoing) && transaction.fromUser !== null)
    currencyIsoName = transaction.fromUser.account.currency.isoName;

  let conversionRate: string = "";
  if ((isIncoming || isOutgoing) && transaction.fromUser !== null)
    conversionRate = `1 ${currencyIsoName} = ${transaction.rate} ${transaction.toUser.account.currency.isoName}`;

  return (
    <div className="row transactionCard align-items-center p-2 m-2">
      <div className="col-sm-8 transactionDetails">
        <strong>
          {isOutgoing &&
            "To: " +
              transaction.toUser.fullname +
              " (" +
              transaction.toUser.email +
              ")"}
          {isIncoming &&
            transaction.fromUser !== null &&
            "From: " +
              transaction.fromUser.fullname +
              " (" +
              transaction.fromUser.email +
              ")"}
          {isAddFunds && "Added funds"}
        </strong>
        <br />
        {conversionRate.length > 0 && (
          <div>
            <span>Conversion rate: {conversionRate}</span>
            <br />
          </div>
        )}
        Date: {moment(transaction.date).format("DD MMMM YYYY HH:mm")}
      </div>
      <h6 className="col-sm-4 mb-0 transactionAmount">
        {isOutgoing ? "-" + transaction.amount : transaction.amount}{" "}
        {currencyIsoName}
        {isIncoming &&
          transaction.fromUser !== null &&
          transaction.toUser.account.currency.isoName !==
            transaction.fromUser.account.currency.isoName && (
            <span>
              (
              {(transaction.amount * transaction.rate).toFixed(2) +
                " " +
                transaction.toUser.account.currency.isoName}
              )
            </span>
          )}
      </h6>
    </div>
  );
};

export default TransactionCard;

import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { getTransactions } from "../../redux/actions/transactionActions";
import { Spinner } from "../common/Spinner";
import TransactionCard from "../common/TransactionCard";
import { User } from "../../redux/types/userTypes";
import { Link } from "react-router-dom";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  loadingTransactions: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class TransactionsPage extends React.Component<Props, State> {
  state: State = {
    loadingTransactions: false
  };

  componentDidMount = () => {
    this.setState({ loadingTransactions: true });
    this.props
      .getTransactions()
      .then(_ => this.setState({ loadingTransactions: false }));
  };

  transactionsList = () => {
    if (this.state.loadingTransactions)
      return (
        <div className="text-center">
          <Spinner />
        </div>
      );

    return (
      <div className="row">
        {this.props.transactions.map((t, idx) => (
          <TransactionCard
            key={idx} // bad
            transaction={t}
            currentUserEmail={(this.props.user as User).username}
          />
        ))}
      </div>
    );
  };

  render() {
    if (this.props.user == null) return null;
    return (
      <div>
        <h1 className="text-center pt-2">All transactions</h1>
        <div className="row text-center">
          <div className="col-12 pb-3">
            <Link to="/addFunds">
              <button className="btn btn-primary m-1">Add funds</button>
            </Link>
            <Link to="/newTransaction">
              <button className="btn btn-primary m-1">New transaction</button>
            </Link>
          </div>
        </div>
        {this.transactionsList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
  errors: state.errorState.errors,
  transactions: state.transactionState.transactions
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, any, AnyAction>
) => ({
  //
  getTransactions: () => dispatch(getTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);

import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { createTransaction } from "../../redux/actions/transactionActions";
import { RouteComponentProps, Redirect } from "react-router-dom";

type RouteParams = {
  accountId?: string;
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  amount: number;
  toAccountId: string;
  error: boolean;
  redirectToTransactions: boolean;
};
type Props = OwnProps &
  StateProps &
  DispatchProps &
  RouteComponentProps<RouteParams>;

class NewTransactionPage extends React.Component<Props, State> {
  state: State = {
    amount: 0.1,
    toAccountId: "",
    error: false,
    redirectToTransactions: false
  };

  componentDidMount = () => {
    if (
      this.props.match.params.accountId !== undefined &&
      this.props.match.params.accountId.length > 0
    )
      this.setState({ toAccountId: this.props.match.params.accountId });
  };

  onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      amount: parseFloat(parseFloat(event.target.value).toFixed(2))
    });
  };

  onChangeToAccountId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ toAccountId: event.target.value });
  };

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ error: false });
    this.props
      .createTransaction(this.state.toAccountId, this.state.amount)
      .then(result => {
        if (result !== undefined) this.setState({ error: true });
        else this.setState({ redirectToTransactions: true });
      });
    // this.props
    // .addFunds(this.state.amount)
    // .then(_ => this.setState({ redirectToTransactions: true }));
  };

  render() {
    if (this.state.redirectToTransactions)
      return <Redirect to="/transactions" push />;

    return (
      <div>
        <h1 className="text-center pt-2">Create a new transaction</h1>
        {this.state.error && (
          <div className="alert alert-danger">
            Could not create the transaction! Please check that the account id
            is correct and try again!
          </div>
        )}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Destination account id</label>
            <input
              className="form-control"
              name="toAccountId"
              onChange={this.onChangeToAccountId}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              type="text"
              value={this.state.toAccountId}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-control"
              name="amount"
              onChange={this.onChangeAmount}
              placeholder="Amount"
              type="number"
              value={this.state.amount}
              required
              min={0.1}
              max={999999}
              step={0.01}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
  errors: state.errorState.errors
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, any, AnyAction>
) => ({
  createTransaction: (toAccountId: string, amount: number) =>
    dispatch(createTransaction(toAccountId, amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionPage);

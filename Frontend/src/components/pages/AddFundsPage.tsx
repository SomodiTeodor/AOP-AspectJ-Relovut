import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { addFunds } from "../../redux/actions/transactionActions";
import { Redirect } from "react-router-dom";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  amount: number;
  redirectToTransactions: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class AddFundsPage extends React.Component<Props, State> {
  state: State = {
    amount: 0,
    redirectToTransactions: false
  };

  componentDidMount = () => {};

  onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      amount: parseFloat(parseFloat(event.target.value).toFixed(2))
    });
  };

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props
      .addFunds(this.state.amount)
      .then(_ => this.setState({ redirectToTransactions: true }));
  };

  render() {
    if (this.state.redirectToTransactions)
      return <Redirect to="/transactions" push />;

    return (
      <div>
        <h1 className="text-center pt-2">Add funds</h1>
        <form onSubmit={this.onSubmit}>
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
              min={0}
              max={999999}
              step={0.01}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add funds
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
  //
  addFunds: (amount: number) => dispatch(addFunds(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFundsPage);

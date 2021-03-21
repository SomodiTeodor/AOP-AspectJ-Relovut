import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import LogoImage from "../../assets/logo.png";
import "../../scss/Dashboard.scss";
import { Spinner } from "../common/Spinner";
import { getAccountDetails } from "../../redux/actions/userActions";
import { AccountDetails } from "../../redux/types/userTypes";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  loadingAccount: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class Dashboard extends React.Component<Props, State> {
  state: State = {
    loadingAccount: false
  };

  componentDidMount = () => {
    document.title = "Relovut | Your money, our pockets";
    this.setState({ loadingAccount: true });
    this.props
      .getAccountDetails()
      .then(_ => this.setState({ loadingAccount: false }));
  };

  render() {
    if (this.state.loadingAccount || this.props.accountDetails === null)
      return (
        <div className="text-center">
          <Spinner />
        </div>
      );

    const accountDetails = this.props.accountDetails as AccountDetails;

    return (
      <div className="dashboard">
        <div className="row">
          <div className="col-12 dashboard-image">
            <img src={LogoImage} alt="RelovutLogo" />
          </div>

          <div className="col-12 text-center">
            <h3>Your account details:</h3>
            <div>ID: {accountDetails.id}</div>
            <div>
              Balance:{" "}
              {accountDetails.amount + " " + accountDetails.currency.isoName}{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
  errors: state.errorState.errors,
  accountDetails: state.userState.accountDetails
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, any, AnyAction>
) => ({
  getAccountDetails: () => dispatch(getAccountDetails())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

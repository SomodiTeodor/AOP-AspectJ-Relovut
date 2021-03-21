import React from "react";
import "../../scss/Navbar.scss";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import RelovutIcon from "../../assets/icon.png";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  redirectToLogin: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class Navbar extends React.Component<Props, State> {
  state: State = {
    redirectToLogin: false
  };

  componentDidMount = () => {
    if (
      this.props.user === null ||
      this.props.user.username === null ||
      this.props.user.username === undefined ||
      this.props.user.username.length === 0
    ) {
      this.setState({ redirectToLogin: true });
      return;
    }
  };

  onLogoutClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.logout();
    this.setState({ redirectToLogin: true });
  };

  render() {
    if (this.state.redirectToLogin) return <Redirect push to="/login" />;

    return (
      <div>
        <header id="header">
          <Link className="navbar_logo" to="/">
            <img src={RelovutIcon} alt="RelovutIcon" />
            Relovut
          </Link>
          <Link className="navbar_link" to="/transactions">
            Transactions
          </Link>
          <Link className="navbar_link" to="/friends">
            Friends
          </Link>
          <Link className="navbar_link" to="/reports">
            Reports
          </Link>
          <Link className="navbar_link" to="/charts">
            Charts
          </Link>
          <div className="spacer" />
          Hi, {this.props.user !== null ? this.props.user.username : null}
          <a
            href="#header"
            className="header-logout"
            onClick={this.onLogoutClick}
          >
            Logout
          </a>
        </header>
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
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

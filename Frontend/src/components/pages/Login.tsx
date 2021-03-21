import React from "react";
import "../../scss/Login.scss";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { login, getCurrentUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import LogoImage from "../../assets/logo.png";
import { Link, Redirect } from "react-router-dom";
import TextInput from "../common/TextInput";
import { clearErrors } from "../../redux/actions/errorActions";
import { SET_USER } from "../../redux/types/userTypes";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  username: string;
  password: string;
  isLoading: boolean;
  redirectToDashboard: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: "",
    isLoading: false,
    redirectToDashboard: false
  };

  componentDidMount = () => {
    document.title = "Login";

    if (
      this.props.user !== null &&
      this.props.user.username != null &&
      this.props.user.username !== undefined &&
      this.props.user.username.length > 0
    )
      this.setState({ redirectToDashboard: true });
  };

  componentWillUnmount = () => {
    this.props.clearErrors();
  };

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.clearErrors();
    this.props.login(this.state.username, this.state.password).then(ev => {
      if (ev.type === SET_USER)
        this.setState({ isLoading: false, redirectToDashboard: true });
      else this.setState({ isLoading: false });
    });
  };

  onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  render() {
    if (this.state.redirectToDashboard) return <Redirect to="/" push />;

    let usernameError =
      this.props.errors.find(err => err.name === "username") !== undefined
        ? "Invalid username"
        : "";
    let passwordError =
      this.props.errors.find(err => err.name === "password") !== undefined
        ? "Invalid password"
        : "";

    return (
      <div className="login-body">
        <div className="login-content">
          <img src={LogoImage} alt="Logo" />
          <form className="login-form" onSubmit={this.onSubmit}>
            <h2 style={{ color: "#555" }}>Login</h2>

            <TextInput
              placeholder="Email"
              name="username"
              type="email"
              value={this.state.username}
              onChange={this.onChangeUsername}
              error={usernameError}
              required
            />

            <TextInput
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              error={passwordError}
              required
            />

            <button
              type="submit"
              className={"btn btn-primary"}
              disabled={this.state.isLoading}
            >
              {this.state.isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Submit
            </button>
          </form>
          <div className="clearfix" />
          <hr />
          <div className="create-account">
            <h3 style={{ color: "#555" }}>Don't have an account?</h3>
            <p>
              <Link to="/register">Create a new account!</Link>
            </p>
          </div>
        </div>
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
  login: (username: string, password: string) =>
    dispatch(login(username, password)),
  getCurrentUser: () => dispatch(getCurrentUser()),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

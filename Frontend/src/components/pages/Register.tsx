import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import TextInput from "../common/TextInput";
import { clearErrors } from "../../redux/actions/errorActions";
import LogoImage from "../../assets/logo.png";
import { registerUser } from "../../redux/actions/userActions";
import { Link, Redirect } from "react-router-dom";
import findErrorInArray from "../../utils/findErrorInArray";
import { SET_USER } from "../../redux/types/userTypes";
import SelectInput from "../common/SelectInput";
import { getCurrencies } from "../../redux/actions/currencyActions";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  username: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  currencyIsoName: string;
  isLoading: boolean;
  redirectToDashboard: boolean;
};
type Props = OwnProps & StateProps & DispatchProps;

class Register extends React.Component<Props, State> {
  state: State = {
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    currencyIsoName: "RON",
    isLoading: false,
    redirectToDashboard: false
  };

  componentDidMount = () => {
    document.title = "Register";

    this.props.getCurrencies();

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
    this.props
      .register(
        this.state.username,
        this.state.password,
        this.state.confirmPassword,
        this.state.fullname,
        this.state.currencyIsoName
      )
      .then(ev => {
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

  onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ confirmPassword: event.target.value });
  };

  onChangeFullname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fullname: event.target.value });
  };

  onSelectCurrencyIsoName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ currencyIsoName: event.target.value });
  };

  getErrors = () => {
    let usernameError = findErrorInArray("username", this.props.errors);
    let passwordError = findErrorInArray("password", this.props.errors);
    let confirmPasswordError = findErrorInArray(
      "confirmPassword",
      this.props.errors
    );
    return {
      usernameError,
      passwordError,
      confirmPasswordError
    };
  };

  registerForm = () => {
    let {
      usernameError,
      passwordError,
      confirmPasswordError
    } = this.getErrors();

    return (
      <form className="login-form" onSubmit={this.onSubmit}>
        <h2 style={{ color: "#555" }}>Create an account</h2>

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
          placeholder="Full Name"
          name="fullname"
          type="text"
          value={this.state.fullname}
          onChange={this.onChangeFullname}
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

        <TextInput
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.onChangeConfirmPassword}
          error={confirmPasswordError}
          required
        />

        <SelectInput
          placeholder="Currency"
          name="currency"
          value={this.state.currencyIsoName}
          onSelect={this.onSelectCurrencyIsoName}
          required
        >
          {this.props.currencies.length > 0
            ? this.props.currencies.map(currency => (
                <option key={currency.isoName} value={currency.isoName}>
                  {currency.isoName}
                </option>
              ))
            : null}
        </SelectInput>

        <button
          type="submit"
          className="btn btn-primary"
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
    );
  };

  render() {
    if (this.state.redirectToDashboard) return <Redirect to="/" push />;

    return (
      <div className="login-body">
        <div className="login-content">
          <img src={LogoImage} alt="Logo" />
          {this.registerForm()}
          <Link to="/login">Back to login</Link>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
  errors: state.errorState.errors,
  currencies: state.currencyState.currencies
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, any, AnyAction>
) => ({
  clearErrors: () => dispatch(clearErrors()),
  register: (
    username: string,
    password: string,
    confirmPassword: string,
    fullname: string,
    currencyIsoName: string
  ) =>
    dispatch(
      registerUser(
        username,
        password,
        confirmPassword,
        fullname,
        currencyIsoName
      )
    ),
  getCurrencies: () => dispatch(getCurrencies())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

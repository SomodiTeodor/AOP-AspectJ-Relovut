import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { Spinner } from "../common/Spinner";
import {
  getFriends,
  clearFriends,
  searchForFriends,
  clearSearchFriends,
  addFriend,
  removeFriend
} from "../../redux/actions/userActions";
import FriendCard from "../common/FriendCard";
import "../../scss/FriendsPage.scss";
import { Redirect } from "react-router-dom";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  showSearchForm: boolean;
  email: string;
  fullname: string;
  loadingFriends: boolean;
  loadingSearch: boolean;
  redirectAccountId: string;
};
type Props = OwnProps & StateProps & DispatchProps;

class FriendsPage extends React.Component<Props, State> {
  state: State = {
    showSearchForm: false,
    email: "",
    fullname: "",
    loadingFriends: false,
    loadingSearch: false,
    redirectAccountId: ""
  };

  componentDidMount = () => {
    this.setState({ loadingFriends: true });
    this.props.getFriends().then(_ => this.setState({ loadingFriends: false }));
  };

  componentWillUnmount = () => {
    this.props.clearFriends();
    this.props.clearSearchFriends();
  };

  toggleShowSearchForm = () => {
    this.setState(prevState => {
      return { showSearchForm: !prevState.showSearchForm };
    });
  };

  onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  onChangeFullname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fullname: event.target.value });
  };

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    this.setState({ loadingSearch: true });
    this.props.clearSearchFriends();
    this.props
      .searchForFriends(this.state.email, this.state.fullname)
      .then(_ => this.setState({ loadingSearch: false }));
  };

  redirectToNewTransaction = (accountId: string) => {
    this.setState({ redirectAccountId: accountId });
  };

  addFriend = (email: string) => {
    this.props.addFriend(email).then(result => {
      if (result === undefined) {
        this.props.clearFriends();
        this.props.clearSearchFriends();

        this.setState({ loadingFriends: true, loadingSearch: true });
        this.props
          .getFriends()
          .then(_ => this.setState({ loadingFriends: false }));
        this.props
          .searchForFriends(this.state.email, this.state.fullname)
          .then(_ => this.setState({ loadingSearch: false }));
      }
    });
  };

  removeFriend = (email: string) => {
    this.props.removeFriend(email).then(result => {
      if (result === undefined) {
        this.props.clearFriends();
        this.setState({ loadingFriends: true, loadingSearch: true });
        this.props
          .getFriends()
          .then(_ => this.setState({ loadingFriends: false }));
        this.props
          .searchForFriends(this.state.email, this.state.fullname)
          .then(_ => this.setState({ loadingSearch: false }));
      }
    });
  };

  searchForm = () => {
    if (!this.state.showSearchForm) return null;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="mt-3 mb-3">
          <div className="form-group row mb-0">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
          </div>
          <div className="text-center p-2">- or -</div>
          <div className="form-group row mt-0">
            <label className="col-sm-2 col-form-label">Full name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                value={this.state.fullname}
                onChange={this.onChangeFullname}
              />
            </div>
          </div>
          <div className="text-right">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>

        {this.searchResults()}
        <hr />
      </div>
    );
  };

  searchResults = () => {
    if (!this.state.showSearchForm) return null;
    if (this.state.loadingSearch)
      return (
        <div className="text-center p-2">
          <Spinner />
        </div>
      );

    if (this.props.searchFriends.length > 0)
      return (
        <div className="row">
          {this.props.searchFriends.map(f => (
            <div className="col-lg-6 friendCardContainer" key={f.accountId}>
              <FriendCard
                friend={f}
                showAddButton
                addFriend={this.addFriend}
                removeFriend={this.removeFriend}
              />
            </div>
          ))}
        </div>
      );
  };

  friendsList = () => {
    if (this.state.loadingFriends)
      return (
        <div className="text-center p-2">
          <Spinner />
        </div>
      );

    if (this.props.friends.length === 0)
      return <div className="text-center">No friends {":("}</div>;

    return (
      <div className="row">
        {this.props.friends.map(f => (
          <div
            className="col-lg-6 friendCardContainer clickable"
            key={f.accountId}
            onClick={() => this.redirectToNewTransaction(f.accountId)}
          >
            <FriendCard
              key={f.accountId}
              friend={f}
              addFriend={this.addFriend}
              removeFriend={this.removeFriend}
            />
          </div>
        ))}
      </div>
    );
  };

  render() {
    if (this.state.redirectAccountId.length > 0)
      return (
        <Redirect to={"/newTransaction/" + this.state.redirectAccountId} push />
      );

    return (
      <div>
        {/* <h1 className="text-center pt-2">Friends</h1> */}
        <button
          className="btn btn-primary mt-2"
          onClick={this.toggleShowSearchForm}
        >
          Search for new friends
        </button>

        {this.searchForm()}

        <h2 className="text-center pt-2">Your friends</h2>
        {this.friendsList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
  errors: state.errorState.errors,
  friends: state.userState.friends,
  searchFriends: state.userState.searchFriends
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, any, AnyAction>
) => ({
  getFriends: () => dispatch(getFriends()),
  clearFriends: () => dispatch(clearFriends()),
  searchForFriends: (email: string, fullname: string) =>
    dispatch(searchForFriends(email, fullname)),
  clearSearchFriends: () => dispatch(clearSearchFriends()),
  addFriend: (email: string) => dispatch(addFriend(email)),
  removeFriend: (email: string) => dispatch(removeFriend(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);

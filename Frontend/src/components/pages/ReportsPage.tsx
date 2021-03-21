import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import {
  OnDatesChangeProps,
  FocusedInput,
  DateRangeInput
} from "@datepicker-react/styled";
import { sendReport } from "../../redux/actions/reportActions";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  fromDate: Date | null;
  toDate: Date | null;
  focusedInput: FocusedInput;
  succeeded: boolean | undefined;
};
type Props = OwnProps & StateProps & DispatchProps;

class ReportsPage extends React.Component<Props, State> {
  state: State = {
    fromDate: null,
    toDate: null,
    focusedInput: null,
    succeeded: undefined
  };

  componentDidMount = () => {};

  onDatesChange = (data: OnDatesChangeProps) => {
    this.setState({
      fromDate: data.startDate,
      toDate: data.endDate,
      focusedInput: data.focusedInput,
      succeeded: undefined
    });
  };

  onFocusedInputChange = (focusedInput: FocusedInput) => {
    this.setState({ focusedInput });
  };

  onSubmit = () => {
    if (this.state.toDate !== null && this.state.fromDate !== null)
      this.props
        .sendReport(this.state.fromDate, this.state.toDate)
        .then(response => {
          if (response === undefined) this.setState({ succeeded: true });
          else this.setState({ succeeded: false });
        });
  };

  render() {
    return (
      <div>
        <h1 className="text-center pt-2 mb-4">Send a report!</h1>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div>
            <DateRangeInput
              onDatesChange={this.onDatesChange}
              startDate={this.state.fromDate}
              endDate={this.state.toDate}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.onFocusedInputChange}
              displayFormat="dd/MM/yyyy"
            />
          </div>
          {this.state.fromDate !== null && this.state.toDate !== null && (
            <div>
              <button
                onClick={this.onSubmit}
                className="btn btn-primary btn-lg m-3"
              >
                Send
              </button>
            </div>
          )}
          {this.state.succeeded === true && (
            <span className="text-success">Report sent successfully!</span>
          )}
          {this.state.succeeded === false && (
            <span className="text-danger">
              Failed to send report! Please try again!
            </span>
          )}
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
  //
  sendReport: (fromDate: Date, toDate: Date) =>
    dispatch(sendReport(fromDate, toDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPage);

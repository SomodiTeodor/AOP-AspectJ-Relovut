import React from "react";
import { StoreState } from "../../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import {
  getIncomingTransactionsThisMonth,
  getOutgoingTransactionsThisMonth
} from "../../redux/actions/chartActions";
import HighchartsReact from "highcharts-react-official";
import HighCharts, { Options } from "highcharts";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};
type State = {
  loading: boolean;
  chartOptions: Options;
};
type Props = OwnProps & StateProps & DispatchProps;

class ChartsPage extends React.Component<Props, State> {
  state: State = {
    loading: false,
    chartOptions: {
      chart: {
        type: "column"
      },
      title: {
        text: "Incoming and outgoing transactions for this month"
      },
      xAxis: {
        type: "datetime"
      },
      yAxis: {
        type: "linear"
      },
      series: [
        {
          type: "column",
          data: [[]]
        },
        {
          type: "column",
          data: [[]]
        }
      ]
    }
  };

  componentDidMount = () => {
    this.setState({ loading: true });

    Promise.all([
      this.props.getIncomingTransactionsThisMonth,
      this.props.getOutgoingTransactionsThisMonth
    ])
      .then(() => {
        this.setState({
          chartOptions: {
            series: [
              {
                name: "incomingTransactions",
                type: "column",
                data: this.props.incomingTransactionsThisMonth.map(
                  transaction => [
                    new Date(transaction.date).getTime(),
                    transaction.amount
                  ]
                ),
                color: "#00bb00"
              },
              {
                name: "outgoingTransactions",
                type: "column",
                data: this.props.outgoingTransactionsThisMonth.map(
                  transaction => [
                    new Date(transaction.date).getTime(),
                    transaction.amount
                  ]
                ),
                color: "#bb0000"
              }
            ]
          }
        });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <div>
        <h1 className="text-center pt-2">Charts</h1>
        <HighchartsReact
          options={this.state.chartOptions}
          highCharts={HighCharts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
  errors: state.errorState.errors,
  incomingTransactionsThisMonth:
    state.chartsState.incomingTransactionsThisMonth,
  outgoingTransactionsThisMonth: state.chartsState.outgoingTransactionsThisMonth
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, any, AnyAction>
) => ({
  getIncomingTransactionsThisMonth: dispatch(
    getIncomingTransactionsThisMonth()
  ),
  getOutgoingTransactionsThisMonth: dispatch(getOutgoingTransactionsThisMonth())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartsPage);

import React from "react";
import { Component } from "react";
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@material-ui/core";

import Pagination from "@material-ui/lab/Pagination";
import "./styles.css";
import { transactions } from "./transactions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: {},
      selectedAccount: "",
      selectedTransactions: [],
      currentPage: 0
    };
  }

  componentDidMount() {
    const accounts = {};
    transactions.forEach(transaction => {
      const accountNo = transaction["Account No"];
      if (!(accountNo in accounts)) {
        accounts[accountNo] = {
          transactions: []
        };
      }
      accounts[accountNo]["transactions"].push(transaction);
    });

    this.setState({
      accounts: accounts
    });
  }

  handleGetTransactions(page, accountNo) {
    let transactions = this.state.accounts[accountNo].transactions;
    transactions = transactions.slice(page * 10, (page + 1) * 10);
    this.setState({ selectedTransactions: transactions });
  }

  handleSetAccountNumber(accountNo) {
    const pages = Math.round(
      this.state.accounts[accountNo].transactions.length / 10
    );
    console.log(pages);
    this.setState({ selectedAccount: accountNo, pages: pages });
    this.handleGetTransactions(0, accountNo);
  }

  handlePageChange(event, value) {
    this.handleGetTransactions(value - 1, this.state.selectedAccount);
  }

  render() {
    return (
      <Grid container className="App">
        <Grid item sm={3} xs={3}>
          <TableContainer>
            <Table aria-label="simple table" className="account-table">
              <TableHead>
                <TableRow>
                  <TableCell>Account No (Click to get info)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.state.accounts).map((accountNo, i) => (
                  <TableRow key={i}>
                    <TableCell
                      component="th"
                      scope="row"
                      className="account-number"
                      onClick={() => this.handleSetAccountNumber(accountNo)}
                    >
                      {accountNo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={9} xs={9}>
          {this.state.selectedAccount.length > 0 && (
            <Grid container>
              <Pagination
                count={this.state.pages}
                onChange={this.handlePageChange.bind(this)}
              />
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Account No</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">
                        Transaction Details&nbsp;(g)
                      </TableCell>
                      <TableCell align="right">Value Date&nbsp;(g)</TableCell>
                      <TableCell align="right">
                        Withdrawal AMT&nbsp;(g)
                      </TableCell>
                      <TableCell align="right">Deposit AMT&nbsp;(g)</TableCell>
                      <TableCell align="right">Balance AMT&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.selectedTransactions.map((transaction, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {transaction["Account No"]}
                        </TableCell>
                        <TableCell align="right">
                          {transaction["Date"]}
                        </TableCell>
                        <TableCell align="right">
                          {transaction["Transaction Details"]}
                        </TableCell>
                        <TableCell align="right">
                          {transaction["Value Date"]}
                        </TableCell>
                        <TableCell align="right">
                          {transaction["Withdrawal AMT"]}
                        </TableCell>
                        <TableCell align="right">
                          {transaction["Deposit AMT"]}
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          {transaction["Balance AMT"]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const requestUrl = "https://api.piggy.co.in/v1/mf/?key=118656INF204K01E05";

  const [funds, setFunds] = useState([]);
  const [fundList, addFund] = useState([]);
  const [flag, setFlag] = useState(0);

  const searchFund = e => {
    e.preventDefault();
    const query = e.target.query.value;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token a41d2b39e3b47412504509bb5a1b66498fb1f43a",
      "cache-control": "no cache"
    };

    const payload = {
      search: query,
      rows: "2",
      offset: "1"
    };
    axios
      .post("https://api.piggy.co.in/v2/mf/search/", payload, headers)
      .then(response => {
        console.log(response);
        setFunds(response.data.data.search_results);
        setFlag(0);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("GG");
    getFunds();
  }, []);

  const getFunds = async () => {
    const response = await fetch(requestUrl);
    const data = await response.json();
    //console.log(data.data.funds);
    //setFunds(data.data.funds);
  };
  function test(e) {
    // tempList.push(e);
    // console.log(tempList);
    if (fundList.indexOf(e) > -1) return;
    addFund([...fundList, e]);
  }
  function compare() {
    setFunds([]);
    setFunds(fundList);
    setFlag(1);
  }
  return (
    <div className="App">
      <div className="container mt-4">
        <h3>Piggy Search</h3>

        <form onSubmit={searchFund} className="search-form">
          <div className="row">
            <div className="col col-7">
              <div className="form-group">
                <input className="form-control" name="query" type="text" />
              </div>
            </div>
            <div className="col col-3">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
        <span>
          <button onClick={() => compare()} className="btn btn-info">
            Compare Selected
          </button>
        </span>
        {flag && (
          <table className="table table-flushed">
            <thead>
              <tr>
                <th colSpan="5">Name</th>
                <th colSpan="5">Rating</th>
                <th colSpan="5">Riskometer</th>
                <th colSpan="5">Asset_aum</th>
                <th colSpan="5">Return 3year</th>
              </tr>
            </thead>
          </table>
        )}
        {funds.map((fund, i) =>
          // <Fund
          // />
          !flag ? (
            <div key={i} className="card mt-2 shadow">
              <div className="card-body text-default">
                <h3>{fund.name}</h3>
                <p>
                  <b>Category</b>: {fund.category}
                </p>
                <p>
                  <b>Sub Category</b>:{fund.sub_category}
                </p>
                <p>
                  <b>Rating</b>: {fund.rating}
                </p>
                <p>
                  <b>Return From Beginning</b>:{fund.return_from_beginning}
                </p>
                <p>
                  <b>Riskometer</b>:{fund.riskometer}
                </p>
                <p>
                  <b>Yoy Return</b>: {fund.yoy_return}
                </p>

                {fundList.indexOf(fund) > -1 ? (
                  <button className="btn btn-default" disabled>
                    Added
                  </button>
                ) : (
                  <button
                    onClick={() => test(fund)}
                    className="btn btn-success"
                  >
                    Add to compare
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div key={i}>
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <td colSpan="5">{fund.name}</td>
                    <td colSpan="5">{fund.rating}</td>
                    <td colSpan="5">{fund.riskometer}</td>
                    <td colSpan="5">{fund.asset_aum}</td>
                    <td colSpan="5">{fund.return_3yr}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;

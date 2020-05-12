import React from "react";
import Table from "react-bootstrap/Table";
import "../App.css";

interface refObj {
  ticker: string;
  amount: string;
  owned: boolean;
  address: string;
  site: string;
  points: number;
}

type tokens = {
  address: string;
  doy: refObj;
  fish: refObj;
  gin: refObj;
  jolene: refObj;
  sonnet: refObj;
};

const TknTable = (props: tokens) => {
  return (
    <div className="table-div">
      <Table bordered hover variant={"dark"}>
        <thead>
          <tr>
            <th colSpan={3}>{props.address}</th>
          </tr>
          <tr>
            <th colSpan={2}>Adventure Tokens</th>
            <th>Bag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="/images/ball.png"
                className={"token-table-images"}
                alt={"Basketball"}
              />
            </td>
            <td>
              <a href={props.doy.site} target="_blanck">
                {props.doy.ticker}
              </a>
            </td>
            <td>{props.doy.amount}</td>
          </tr>
          <tr>
            <td>
              <img
                src="/images/fish.png"
                className={"token-table-images"}
                alt={"fishclub"}
              />
            </td>
            <td>
              <a href={props.fish.site} target="_blanck">
                {props.fish.ticker}
              </a>
            </td>
            <td>{props.fish.amount}</td>
          </tr>
          <tr>
            <td>
              <img
                src="/images/snoop.png"
                className={"token-table-images"}
                alt={"Snoop"}
              />
            </td>
            <td>
              <a href={props.gin.site} target="_blanck">
                {props.gin.ticker}
              </a>
            </td>
            <td>{props.gin.amount}</td>
          </tr>
          <tr>
            <td>
              <img
                src="/images/jolene.png"
                className={"token-table-images"}
                alt={"Ball"}
              />
            </td>
            <td>
              <a href={props.jolene.site} target="_blanck">
                {props.jolene.ticker}
              </a>
            </td>
            <td>{props.jolene.amount}</td>
          </tr>
          <tr>
            <td>
              <img
                src="/images/shakes.png"
                className={"token-table-images"}
                alt={"To be or not to be"}
              />
            </td>
            <td>
              <a href={props.sonnet.site} target="_blanck">
                {props.sonnet.ticker}
              </a>
            </td>
            <td>{props.sonnet.amount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export { TknTable };

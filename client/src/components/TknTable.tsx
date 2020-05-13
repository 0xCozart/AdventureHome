import React from "react";
import Table from "react-bootstrap/Table";
import { tokenName, tokenDataObj } from "../types/tokenStyles";
import "../App.css";

type tableData = {
  userAddress: string;
  tokenData: tokenDataObj;
  balance: { [key: number]: { value: string } };
};

const TknTable = (props: tableData) => {
  return (
    <div className="table-div">
      <Table bordered hover variant={"dark"}>
        <thead>
          <tr>
            <th colSpan={3}>{props.userAddress}</th>
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
              <a
                href={props.tokenData[tokenName.dunkonyou].link}
                target="_blanck"
              >
                {props.tokenData[tokenName.dunkonyou].ticker}
              </a>
            </td>
            <td>{props.balance[tokenName.dunkonyou].value}</td>
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
              <a
                href={props.tokenData[tokenName.fishclub].link}
                target="_blanck"
              >
                {props.tokenData[tokenName.fishclub].ticker}
              </a>
            </td>
            <td>{props.balance[tokenName.fishclub].value}</td>
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
              <a
                href={props.tokenData[tokenName.ginandjuice].link}
                target="_blanck"
              >
                {props.tokenData[tokenName.ginandjuice].ticker}
              </a>
            </td>
            <td>{props.balance[tokenName.ginandjuice].value}</td>
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
              <a href={props.tokenData[tokenName.jolene].link} target="_blanck">
                {props.tokenData[tokenName.jolene].ticker}
              </a>
            </td>
            <td>{props.balance[tokenName.jolene].value}</td>
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
              <a href={props.tokenData[tokenName.sonnet].link} target="_blanck">
                {props.tokenData[tokenName.sonnet].ticker}
              </a>
            </td>
            <td>{props.balance[tokenName.sonnet].value}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export { TknTable };

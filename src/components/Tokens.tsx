import React, { useState, useEffect, useRef } from "react";
import { TknTable } from "./TknTable";
import Button from "react-bootstrap/Button";
import { tokens } from "./tokensData";
import "../App.css";

declare let web3: any;
declare let ethereum: any;
declare let Web3: any;

interface data {
  ticker: string;
  amount: string;
  owned: boolean;
  address: string;
  site: string;
  points: number;
}

type tick = {
  name: string;
};

let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

const determineBalance = (
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  let contract = web3.eth.contract(minABI);
  let cont = contract.at(tokenAddress);
  return new Promise<string>((resolve) => {
    let balance: string = cont.balanceOf(
      userAddress,
      (error: any, success: object) => {
        if (error) {
          console.log("something went wrong" + error);
        }
        let output = success.toString();
        output = output.substring(0, output.length - 18);
        resolve(output);
      }
    );
  });
};

export default function Table() {
  const [userAccount, setUserAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const tokensRef = useRef(tokens);

  const connectMetamask = async () => {
    try {
      if (ethereum) {
        web3 = new Web3(ethereum);
        try {
          await ethereum.enable();
          web3.eth.getAccounts((err: string, accounts: string[]) => {
            // console.log(accounts)
            if (err) console.log(err);
            else if (!accounts.length) alert("No Metamask accounts found");
            else {
              setUserAccount(accounts[0]);
              setIsConnected(true);
            }
          });
        } catch (e) {
          console.error("Error, ", e);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    Object.entries(tokensRef.current).forEach(async ([key, value]) => {
      value.amount = await determineBalance(value.address, userAccount);
      if (!value.amount) {
        value.amount = "0";
      }
      value.points = parseInt(value.amount) * 1000;
      parseInt(value.amount) > 0 ? (value.owned = true) : (value.owned = false);
    });
  }, [isConnected]);

  return (
    <div className="centered">
      <div>
        <img
          className={"adventure-logo"}
          src="/adventure-logo.png"
          alt="adventure logo"
        />
      </div>
      <TknTable
        address={userAccount}
        doy={tokensRef.current["DUNKONYOU"]}
        fish={tokensRef.current["FISHCLUB"]}
        gin={tokensRef.current["GINANDJUICE"]}
        jolene={tokensRef.current["JOLENE"]}
        sonnet={tokensRef.current["SONNET18"]}
      />
      <div>
        <Button variant="dark" onClick={connectMetamask}>
          Connect Metamask
        </Button>
      </div>
    </div>
  );
}

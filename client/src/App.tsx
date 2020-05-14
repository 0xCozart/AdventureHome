import React, { useState, useEffect } from "react";
import { tokenData } from "./data/tokenData";
import { TknTable } from "./components/TknTable";
import determineBalance from "./metamask/metamask";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { tokenDataObj, tokenName, balanceObj } from "./types/tokenStyles";

declare let web3: any;
declare let ethereum: any;
declare let Web3: any;

function App() {
  const [userAccount, setUserAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<balanceObj>({
    tokens: ["0", "0", "0", "0", "0"],
  });

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
    let balances: string[] = [];
    Object.entries(tokenData).forEach(async ([token, data]) => {
      let amount: string = await determineBalance(data.address, userAccount);
      if (!amount) {
        amount = "0";
        balances[parseInt(token)] = amount;
      } else {
        balances[parseInt(token)] = amount;
      }
    });
    setTokenBalance((tokenBalance) => ({ ...tokenBalance, tokens: balances }));
  }, [setIsConnected]);

  console.log(tokenBalance);

  return (
    <div className="App">
      <div className="centered">
        <div>
          <img
            className={"adventure-logo"}
            src="/images/adventure-logo.png"
            alt="adventure logo"
          />
        </div>
        <TknTable
          userAddress={userAccount}
          tokenData={tokenData}
          balance={tokenBalance.tokens}
        />
        <div>
          <Button variant="dark" onClick={connectMetamask}>
            Connect Metamask
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

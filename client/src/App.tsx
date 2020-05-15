import React, { useState, useEffect } from "react";
import { tokenData } from "./data/tokenData";
import { TknTable } from "./components/TknTable";
import { balanceObj } from "./@types/tokenStyles";
import { Explorer, sites } from "adventure-component-library";
import determineBalance from "./metamask/metamask";
import { BalanceRequest } from "./components/QueryBar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

declare let web3: any;
declare let ethereum: any;
declare let Web3: any;

function App() {
  const [userAccount, setUserAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<balanceObj>({
    tokens: [],
  });

  const connectMetamask = async () => {
    try {
      if (ethereum) {
        web3 = new Web3(ethereum);
        try {
          await ethereum.enable();
          web3.eth.getAccounts((err: string, accounts: string[]) => {
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
    connectMetamask();
  }, []);

  useEffect(() => {
    if (!isConnected || !userAccount) return;
    (async () => {
      let balances = await Promise.all(
        Object.entries(tokenData).map(async ([token, data]) => {
          return await determineBalance(data.address, userAccount);
        })
      );
      for (let i = 0; i <= balances.length; i++) {
        if (balances[i] === "") {
          balances[i] = "0";
        }
      }
      setTokenBalance((tokenBalance) => ({
        ...tokenBalance,
        tokens: balances,
      }));
    })();
  }, [isConnected, userAccount]);

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
        <BalanceRequest onClickGetBalance={setUserAccount} />
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
      <div className="explorer-bar">
        <Explorer site={sites.ginandjuice} />
      </div>
    </div>
  );
}

export default App;

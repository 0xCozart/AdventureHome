import React, {useState, useEffect, useRef} from 'react'
import { TableHeader, TableBody} from './Table'

declare let web3: any
declare let ethereum: any
declare let Web3: any


enum token {
  dunkonyou = 'DUNKONYOU',
  fishclub = 'FISHCLUB',
  ginandjuice = 'GINANDJUICE',
  jolene = 'JOLENE',
  sonnet18 = 'SONNET18'
}

interface tokenProps { 
    ticker: string
    amount: number
    owned: false
    address: string
}

// type tokenMap = {[]: tokenProps}

let tokens = {
  'DUNKONYOU':{
      ticker: 'DOY',
      amount: 0,
      owned: false,
      address: '0xe24ea27eb42eefdf6a129310a48b88e36fb3d8f5'
  },
  'FISHCLUB':{
    ticker: 'FISHCLUB',
    amount: 0,
    owned: false,
    address: '0x3BCA69e033B3605a714dd815F51Cb4e9D5B4693a'
  },
  'GINANDJUICE': {
    ticker: 'GINANDJUICE',
    amount: 0,
    owned: false,
    address: '0x7339D738bB5623565fa11213313b8f665663A459'
  },
  'JOLENE':{
    ticker: 'JOLENE',
    amount: 0,
    owned: false,
    address: '0x68415b7D02f0215ec33C4EF838eC055609A2E45a'
  },
  'SONNET18':{
      ticker: 'SONNET18',
      amount: 0,
      owned: false,
      address: '0x7339D738bB5623565fa11213313b8f665663A459'
  }
}

function erc20Catalog(erc20Address: string, userAddress: string) {
  let tokenAddress = erc20Address
  let walletAddress = userAddress
  // The minimum ABI to get ERC20 Token balance
  let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ];
  // Get ERC20 Token contract instance
  let contract = web3.eth.contract(minABI).at(tokenAddress);

  // Call balanceOf function
  contract.balanceOf(walletAddress, (error:string, balance:any) => {
    // Get decimals
    contract.decimals((error:string, decimals:number) => {
      // calculate a balance
      balance = balance.div(10**decimals);
      console.log(balance.toString());
      return (balance)
    });
  });
}

export default function Tool() {
  const [userAccount, setUserAccount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [DOY, setDOY] = useState(tokens.DUNKONYOU)
  const [sonnet18, setSonnet18] = useState(tokens.SONNET18)
  const [ginandjuice, setGinandjuice] = useState(tokens.GINANDJUICE)
  const [jolene, setJolene] = useState(tokens.JOLENE)
  const [fishclub, setFishclub] = useState(tokens.FISHCLUB)
  const tokensRef= useRef(tokens)

  const tokenList = [DOY, sonnet18, ginandjuice, jolene, fishclub]
  const setTokenList = [setDOY, setSonnet18, setGinandjuice, setJolene, setFishclub]
  // const sets = [(, setDOY), (sonnet18, setSonnet18), (ginandjuice, setGinandjuice), (jolene, setJolene), (fishclub, setFishclub)]

  let mike : string = '0x48E8479b4906D45fBE702A18ac2454F800238b37'
  let amt
  for(let tkn of tokenList) {
    for (let setTkn of setTokenList){
    amt = erc20Catalog(tkn.address, mike)
    setTkn(amt)
    }
  }

  // console.log(tokenList)
  // erc20Catalog(tokens[token.dunkonyou].address, mike)
  // console.log(userAccount)

  const connectMetamask = async () => {
    try {
      if (ethereum) {
        web3 = new Web3(ethereum)
        try {
          await ethereum.enable()
          web3.eth.getAccounts((err: string, accounts: string[]) => {
            // console.log(accounts)
            if (err) console.log(err)
            else if (!accounts.length) alert('No Metamask accounts found')
            else {
              setUserAccount(accounts[0])
              setIsConnected(true)
            }
          })
        } catch (e) {
          console.error('Error, ', e)
        }
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  const Trigger = () => {
    return (
      <div>
        <button className="button" onClick={connectMetamask}>Connect Metamask</button>
      </div>
    )
  }

  return (
    {isConnected} 
    ?
    (
      <div>
      <Trigger />
      <TableHeader address={userAccount} />
        <TableBody ticker={DOY.ticker} amount={DOY.amount} owned={DOY.owned} />
        <TableBody ticker={sonnet18.ticker} amount={sonnet18.amount} owned={sonnet18.owned} />
        <TableBody ticker={jolene.ticker} amount={jolene.amount} owned={jolene.owned} />
        <TableBody ticker={ginandjuice.ticker} amount={ginandjuice.amount} owned={ginandjuice.owned} />
        <TableBody ticker={fishclub.ticker} amount={fishclub.amount} owned={fishclub.owned} />
      </div>
    )
    :
    (
      <Trigger></Trigger>
    )
  )
}
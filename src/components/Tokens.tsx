import React, {useState, useEffect} from 'react'
import TokenTable from './Table'

declare let web3: any
declare let ethereum: any
declare let Web3: any



enum token {
  dunkonyou,
  fishclub,
  ginandjuice,
  jolene,
  sonnet18
}

type tokenValues = {
  ticker: string
  amount: number
  owned: boolean
}

type tokenMap = { [key in token]: tokenValues }


let tokens : tokenMap = {
  [token.dunkonyou]:{
      ticker: 'DUNKONYOU',
      amount: 0,
      owned: false
  },
  [token.ginandjuice]:{
      ticker: 'GINANDJUIC',
      amount: 0,
      owned: false
  },
  [token.sonnet18]:{
      ticker: 'SONNET18',
      amount: 0,
      owned: false
  },
  [token.jolene]:{
      ticker: 'JOLENE',
      amount: 0,
      owned: false
  },
  [token.fishclub]:{
      ticker: 'FISHCLUB',
      amount: 0,
      owned: false
  }
}

export default function Tool() {
  const [userAccount, setUserAccount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [currToken, setCurrToken] = useState(tokens)

  const tokenList = Object.entries(currToken).map(([key,value])=>{
    return (
      value.toString()
    );
  })

  // useEffect(() => {
  //   setCurrToken.amount(10)
  // }, [currToken])

  console.log(tokenList[0])

  const connectMetamask = async () => {
    try {
      if (ethereum) {
        web3 = new Web3(ethereum)
        try {
          await ethereum.enable()

          web3.eth.getAccounts((err: string, accounts: string[]) => {
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
      <TokenTable address={userAccount} token={tokens[token.dunkonyou].ticker} amount={tokens[token.ginandjuice].amount} owned={false}></TokenTable>
    )
    :
    (
      <Trigger></Trigger>
    )

  )
}
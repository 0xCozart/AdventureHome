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
    amount: string
    owned: false
    address: string
}

// type tokenMap = {[]: tokenProps}

let tokens = {
  'DUNKONYOU':{
      ticker: 'DOY',
      amount: '0',
      owned: false,
      address: '0xe24ea27eb42eefdf6a129310a48b88e36fb3d8f5'
  },
  'FISHCLUB':{
    ticker: 'FISHCLUB',
    amount: '0',
    owned: false,
    address: '0x3BCA69e033B3605a714dd815F51Cb4e9D5B4693a'
  },
  'GINANDJUICE': {
    ticker: 'GINANDJUICE',
    amount: '0',
    owned: false,
    address: '0x4c10c76b6e04A8B2F6be2d9C39119C34907Be07F'
  },
  'JOLENE':{
    ticker: 'JOLENE',
    amount: '0',
    owned: false,
    address: '0x68415b7D02f0215ec33C4EF838eC055609A2E45a'
  },
  'SONNET18':{
      ticker: 'SONNET18',
      amount: '0',
      owned: false,
      address: '0xe1e05a4627fC5015d4374e05454Fd2159760fCf3'
  }
}

async function erc20TokenGrab(erc20Address: string, userAddress: string) {
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
  let contract = web3.eth.contract(minABI);
  let cont = contract.at(tokenAddress);

  // const determineBalance = () => {
  //   return new Promise(resolve => {
  //       let balance : string = cont.balanceOf(walletAddress, (error:any, success:object) => {
  //         if (error) {
  //           console.log('something went wrong' + error)
  //         };
  //         let balance = success.toString()
  //         balance = balance.substring(0, balance.length - 18)
  //         // console.log(typeof(balance))
  //         return balance 
  //       })
  //       console.log(typeof(balance))
  //       return balance
  //     })
  //   }
  // const determineBalance = (address:string) => {
  //   Promise<string> => {resolve => {
  //     let balance : string = cont.balanceOf(address, (error:any, success:object) => {
  //       if (error) {
  //         console.log('something went wrong' + error)
  //       };
  //       let balance = success.toString()
  //       balance = balance.substring(0, balance.length - 18)
  //       // console.log(typeof(balance))
  //       resolve(balance)
  //     })
  //   })
  // }  
  // const bal = await determineBalance(userAddress)
  // // console.log(bal)
  // return bal
}
  // return b
  // Call balanceOf function
  // let total = contract.balanceOf(walletAddress, (error:string, balance:any) => {
  //     // Get decimals
  //     // let read = balance.toString()
  //     // let ret = read.substring(0, read.length - 18)
  //     // return(balance)
  //     contract.decimals((error:any, decimals:number) => {
  //       // calculate a balance
  //       balance = balance.div(10**decimals);
  //       let read : string = balance.toString()
  //       read = read.substring(0, decimals - 18)
  //       console.log(read)
  //       return(read)
  //     });
  //   }
  // )
  // let balance : string = contract.balanceOf(walletAddress, (error:string, balance:any) => {
  //   return balance
  //   });

  // let decimals : number = contract.decimals((error : string, decimals:number) => {
  //   return decimals
  // })
  // let output = balance.div(10**decimals)
  // // balance.toString()
  // console.log(output)
  // let output = total()
  // return output
  // }

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


const determineBalance = (tokenAddress:string, userAddress:string) : Promise<string> => {
  let contract = web3.eth.contract(minABI);
  let cont = contract.at(tokenAddress);
  return new Promise<string> (resolve => {
    let balance : string = cont.balanceOf(userAddress, (error:any, success:object) => {
      if (error) {
        console.log('something went wrong' + error)
      };
      let output = success.toString()
      output = output.substring(0, output.length - 18)
      // console.log(typeof(balance))
      resolve(output)
    })
  })
}  

export default function Tool() {
  const [userAccount, setUserAccount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [tokenBalances, setTokenBalances] = useState({})
  const tokensRef = useRef(tokens)

  let mike : string = '0x48E8479b4906D45fBE702A18ac2454F800238b37'

  const connectMetamask = async() => {
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

  useEffect(() => {
    Object.entries(tokensRef.current).forEach( async ([key, value]) => {
      value.amount = await determineBalance(value.address, mike);
      (parseInt(value.amount) > 0) ? (value.owned = true) : (value.owned=false); 
      let tokenObj = {
        ticker: value.ticker,
        amount: value.amount,
        owned: value.owned
      }
      setTokenBalances({...tokenBalances, tokenObj})
      // console.log(tokenBalan ces)
    })
  }, [isConnected])
  console.log(tokenBalances)

  const Trigger = () => {
    return (
      <div>
        <button className="button" onClick={connectMetamask}>Connect Metamask</button>
      </div>
    )
  }

  // const Body = (ref : object ) => {
  //   return (
  //     <div>
  //       {Object.entries(ref).forEach( async ([key, value]) => {
  //         value.amount = await determineBalance(value.address, mike);
  //         (parseInt(value.amount) > 0) ? (value.owned = true) : (value.owned=false); 
  //         return(<TableBody ticker={value.ticker} amount={value.amount} owned={value.owned} />)
  //         })
  //       }
  //     </div>
  //   )
  // }

  return (
      <div>
      <Trigger />
      <TableHeader address={userAccount} />
      <TableBody ticker={tokensRef.current['DUNKONYOU'].ticker} amount={tokensRef.current['DUNKONYOU'].amount} owned={tokensRef.current['DUNKONYOU'].owned} />
      <TableBody ticker={tokensRef.current['FISHCLUB'].ticker} amount={tokensRef.current['FISHCLUB'].amount} owned={tokensRef.current['FISHCLUB'].owned} />
      <TableBody ticker={tokensRef.current['GINANDJUICE'].ticker} amount={tokensRef.current['GINANDJUICE'].amount} owned={tokensRef.current['GINANDJUICE'].owned} />
      <TableBody ticker={tokensRef.current['JOLENE'].ticker} amount={tokensRef.current['JOLENE'].amount} owned={tokensRef.current['JOLENE'].owned} />
      <TableBody ticker={tokensRef.current['SONNET18'].ticker} amount={tokensRef.current['SONNET18'].amount} owned={tokensRef.current['SONNET18'].owned} />
      </div>
  )
}
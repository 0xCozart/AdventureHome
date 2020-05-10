import React, {useState, useEffect, useRef, ReactInstance} from 'react'
import { TableHeader, TableBody} from './Table'
import { PopupTable, TknTable } from './Popup'
import Button from 'react-bootstrap/Button'
import '../App.css'
import adventure from '/adventure-logo.png'
// import CustomizedTables from './Custom'

declare let web3: any
declare let ethereum: any
declare let Web3: any

let tokens = {
  'DUNKONYOU':{
      ticker: 'DOY',
      amount: '0',
      owned: false,
      address: '0xe24ea27eb42eefdf6a129310a48b88e36fb3d8f5',
      site: 'http://13.56.180.100/',
      points: 0
  },
  'FISHCLUB':{
    ticker: 'FISHCLUB',
    amount: '0',
    owned: false,
    address: '0x3BCA69e033B3605a714dd815F51Cb4e9D5B4693a',
    site: 'http://13.56.180.100/',
    points: 0
  },
  'GINANDJUICE': {
    ticker: 'GINANDJUICE',
    amount: '0',
    owned: false,
    address: '0x4c10c76b6e04A8B2F6be2d9C39119C34907Be07F',
    site: 'http://52.53.173.93/',
    points: 0
  },
  'JOLENE':{
    ticker: 'JOLENE',
    amount: '0',
    owned: false,
    address: '0x68415b7D02f0215ec33C4EF838eC055609A2E45a',
    site: 'http://54.177.174.215/',
    points: 0
  },
  'SONNET18':{
      ticker: 'SONNET18',
      amount: '0',
      owned: false,
      address: '0xe1e05a4627fC5015d4374e05454Fd2159760fCf3',
      site: 'http://13.57.47.139/',
      points: 0
  }
}
export interface data {
  ticker: string
  amount: string
  owned: boolean
  address: string
  site: string
  points: number
}

enum tkns {
  dunkonyou = "DUNKONYOU",
  fishclub = "FISHCLUB",
  jolene = "JOLENE",
  sonnet = "SONNET18",
  ginandjuice = "GINANDJUICE"
}

type tick = {
  name : string
}
interface final {
    [ticker : string] : data
};

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
  const [doy, setDoy] = useState({})
  const [gin, setGin] = useState({})
  const [fish, setFish] = useState({})
  const [jolene, setJolene] = useState({})
  const [sonnet, setSonnet] = useState({})
  const [tokenState, setTokenState] = useState<{[key:string] : data}>({})
  const tokensRef = useRef(tokens)

  // let mike : string = '0x48E8479b4906D45fBE702A18ac2454F800238b37'

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
      value.amount = await determineBalance(value.address, userAccount);
      if(!value.amount){ 
        value.amount = '0'
      }
      value.points = (parseInt(value.amount) * 1000);
      (parseInt(value.amount) > 0) ? (value.owned = true) : (value.owned=false); 
      // let tick : string = value.ticker
      // let update = {
      //   [tick] : {
      //     ticker: value.ticker,
      //     amount: value.amount,
      //     owned: value.owned,
      //     address: value.address,
      //     site: value.site,
      //     points: value.points,
      //   }
      // };
      // setTokenState({...tokenState, update});
      console.log(tokenState)
    })
  }, [isConnected])

  const Trigger = () => {
    return (
      <div>
        <Button variant="dark" onClick={connectMetamask}>Connect Metamask</Button>{' '}
      </div>
    )
  }

  return (
    <div className="centered">
      {/* <PopupTable
        address={mike} 
        doy={tokensRef.current['DUNKONYOU']}
        fish={tokensRef.current['FISHCLUB']}
        gin={tokensRef.current['GINANDJUICE']}
        jolene={tokensRef.current['JOLENE']}
        sonnet={tokensRef.current['SONNET18']}
      /> */}
      <div><img className={"adventure-logo"} src="/adventure-logo.png" alt="adventure logo" /></div>
      <TknTable
        address={userAccount} 
        doy={tokensRef.current['DUNKONYOU']}
        fish={tokensRef.current['FISHCLUB']}
        gin={tokensRef.current['GINANDJUICE']}
        jolene={tokensRef.current['JOLENE']}
        sonnet={tokensRef.current['SONNET18']}
      />
      <Trigger></Trigger>
    </div>
  )
}
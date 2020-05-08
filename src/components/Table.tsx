import React, { Props } from 'react'
const { Table, Tr } = require('styled-table-component')




type headerProps = {
  address: string
}

type bodyProps = {
  ticker: string
  amount: string
  owned: boolean
}

// for (let [key, value] of Object.entries(props.tokens)) {
//   return(
// console.log(`${key}: ${value.test}`);
// }
// {(item, key) => <Tr active key={key}><td>{item}</td><td>{props.amount} {props.owned}</td></Tr>)}

function TableHeader(props : headerProps) {
      
  return( 
    <Table tableDark={true}>
      <thead>
        <th>Your Adventure profile: {props.address}</th>
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
    </Table>
  )
};

function TableBody(props : bodyProps) {
  let owned 
  if(props.owned) {
    owned = 'You own it!'
  }
  else {
    owned = 'You almost own it'
  }

  return(
    <Table tableDark={true}>
      <tbody>
        <Tr tableDark={true} key={props.ticker}><td>{props.ticker}</td><td>{props.amount} {owned}</td></Tr>
      </tbody>
    </Table>
  )
}

// function TokenTable() {
//   return {}
// }

export { 
  TableHeader,
  TableBody
}
// {props.tokens.map((item, index) => (
//   <Item key={index} item={item} />
// ))}
import React from 'react'
const { Table, Tr } = require('styled-table-component')


type tableProps = {
    token: string
    amount: number
    owned: boolean
    address: string
}

const TokenTable = (props : tableProps) => {

  return( 
    <Table tableDark={true}>
      <thead>
        <th>Your Adventure profile: {props.address}</th>
        <tr>
          <th scope="col">Token</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <Tr active><td>{props.token}</td><td>{props.amount} {props.owned}</td></Tr>
      </tbody>
    </Table>
    )
};

export default TokenTable
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Table from 'react-bootstrap/Table'
import styled, { keyframes } from 'styled-components'
import '../App.css'
const bounce = require('react-animations')

// const bounce = require('react-animations')
// const { keyframes } = require("styled-components")

const bounceAnimation = keyframes`${bounce}`;

const BounceCell = styled.td`animation: ${bounceAnimation} infininte 5s;`;



interface refObj {
  ticker: string
  amount: string
  owned: boolean
  address: string
  site: string
  points: number
}

type tokens = {
  address: string
  doy: refObj
  fish: refObj
  gin: refObj
  jolene: refObj
  sonnet: refObj
}


const PopupTable = (props : tokens) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Adventure</Button>}
      {/*
    // @ts-ignore */}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
          {/* <strong className="mr-auto">{props.address}</strong> */}
          <small>{props.address}</small>
        </Toast.Header>
        <Toast.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={2}>Adventure Tokens</th>
              <th>Bag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td> */}
                <BounceCell><img src='/ball.png' className={"token-images"} alt={'Basketball'}/></BounceCell>
              {/* </td>   */}
              <td><a href={props.doy.site}>{props.doy.ticker}</a></td>
              <td>{props.doy.amount}</td>
            </tr>
            <tr>
              <td>  
                <BounceCell><img src='/fish.png' className={"token-images"} alt={'fishclub'}/></BounceCell>
              </td>
              <td><a href={props.fish.site}>{props.fish.ticker}</a></td>
              <td>{props.fish.amount}</td>
            </tr>
            <tr>
              <td>
                <BounceCell><img src='/snoop.png' className={"token-images"} alt={'snoop'}/></BounceCell>
              </td>
              <td><a href={props.gin.site}>{props.gin.ticker}</a></td>
              <td>{props.gin.amount}</td>
            </tr>
            <tr>
              <td>
                <BounceCell><img src='/jolene.png' className={"token-images"} alt={'jolene'}/></BounceCell>
              </td>
              <td><a href={props.jolene.site}>{props.jolene.ticker}</a></td>
              <td>{props.jolene.amount}</td>
            </tr>
            <tr>
              <td>
                <BounceCell><img src='/shakes.png' className={"token-images"} alt={'shakes'}/></BounceCell>
              </td>
              <td><a href={props.sonnet.site}>{props.sonnet.ticker}</a></td>
              <td>{props.sonnet.amount}</td>
            </tr>
          </tbody>
        </Table>
        </Toast.Body>
      </Toast>
    </>
  );
};

const TknTable = (props : tokens) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan={2}>Adventure Tokens</th>
          <th>Bag</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <BounceCell><img src='/ball.png' className={"token-images"} alt={'Basketball'} /></BounceCell>
          </td>  
          <td><a href={props.doy.site}>{props.doy.ticker}</a></td>
          <td>{props.doy.amount}</td>
        </tr>
        <tr>
          <td>  
            <BounceCell><img src='/fish.png' className={"token-images"} alt={'fishclub'}/></BounceCell>
          </td>
          <td><a href={props.fish.site}>{props.fish.ticker}</a></td>
          <td>{props.fish.amount}</td>
        </tr>
        <tr>
          <td>
            <BounceCell><img src='/snoop.png' className={"token-images"} alt={'Snoop'}/></BounceCell>
          </td>
          <td><a href={props.gin.site}>{props.gin.ticker}</a></td>
          <td>{props.gin.amount}</td>
        </tr>
        <tr>
          <td>
            <BounceCell><img src='/jolene.png' className={"token-images"} alt={'Ball'}/></BounceCell>
          </td>
          <td><a href={props.jolene.site}>{props.jolene.ticker}</a></td>
          <td>{props.jolene.amount}</td>
        </tr>
        <tr>
          <td>
            <BounceCell><img src='/shakes.png' className={"token-images"} alt={'To be or not to be'}/></BounceCell>
          </td>
          <td><a href={props.sonnet.site}>{props.sonnet.ticker}</a></td>
          <td>{props.sonnet.amount}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export { 
  PopupTable,
  TknTable
}


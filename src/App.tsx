import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tool from './components/Tokens'

declare let web3: any
declare let ethereum: any
declare let Web3: any



function App() {
  return (
    <div className="App">
      <Tool></Tool>
    </div>
  );
}

export default App;

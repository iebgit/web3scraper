import React, { useState, useEffect } from 'react';
import './MetaButton.css';
import './App.css';

import {
  Button,
  Dropdown,
} from "react-bootstrap";
// (window as any).ethereum also allows typescript to ignore the child types
declare let window: any;

interface IProps {
  network: any,
  networks: any,
}

function MetaButton({ network, networks }: IProps) {
  const [netSwitch, setNetSwitch] = useState(0);

  useEffect(() => {
    if (networks) {
      for (let x = 0; x < networks.length; x++) {
        if (network.id !== netSwitch && networks[x].id === netSwitch) {
          try {
            if (netSwitch === 1) {
              window.ethereum
                .request({
                  method: "wallet_switchEthereumChain",
                  params: [networks[x].networkParams],
                })
                .catch((error: any) => {
                  console.log(error);
                });
            } else {
              window.ethereum
                .request({
                  method: "wallet_addEthereumChain",
                  params: [networks[x].networkParams],
                })
                .catch((error: any) => {
                  console.log(error);
                });
            }
          } catch (error: any) {
            console.log(error);
          }
        } else {

        }
      }
    }
  }, [netSwitch])

  const web3 = () => {

    if (typeof window.ethereum !== 'undefined') {
      console.log('🦊 METAMASK IS INSTALLED!');
      window.ethereum.request({ method: "eth_requestAccounts" })
    } else {
      console.log("🚫 CANNOT ACCCESS METAMASK")
    }
  }
  return (
    <div className="App">
      <Dropdown className='dropdown-btn'>
        <Dropdown.Toggle title='Choose Network' variant={`outline-${network.btn} `} id="dropdown-basic">
          <img
            onClick={web3}
            title='MetaMask'
            className='dropdown-img'
            src={'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'}
            alt="Connect">
          </img>&nbsp;&nbsp;&nbsp;<strong className='ticker-col p1' onClick={web3}>{network.networkName}</strong>
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark">
          {networks.slice(0).reverse().map((net: any) => {
            return <Dropdown.Item className={`bg-dark`} key={net.id} onClick={() => setNetSwitch(net.id)}>
              <strong className={`text-${network.btn} link`}>
                <img
                  title={net.networkName}
                  className={`dropdown-img`}
                  src={net.networkImg}
                  alt="Connect">
                </img>&nbsp;&nbsp;&nbsp;{net.networkName}</strong>
            </Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>



    </div>
  );
}

export default MetaButton;
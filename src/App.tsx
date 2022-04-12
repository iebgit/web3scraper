import React, { Component } from 'react';
import { ethers } from "ethers";
import './App.css';
import './MetaButton.css';
import MITModal from './MITModal'
import StoppableMarquee from './StoppableMarquee';
import networks from "./networks.json";
// import axios from "axios";
import { Row, Col, Container, Spinner } from 'react-bootstrap';

declare let window: any;

interface IProps { }
interface IState {
  provider: any,
  signer: any,
  address: any,
  balance: any,
  message: string,
  chainId: any,
  news: any,
  networks: any,
  network: any,
  time: Date,
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      provider: null,
      signer: null,
      address: null,
      balance: null,
      message: 'Loading...',
      chainId: null,
      news: null,
      networks,
      network: { btn: 'light' },
      time: new Date(),
    }
    try {
      this.addListeners();
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = async () => {
    try {
      await this.getUserData();
      await this.fetchDB()
      if (window.ethereum.isConnected()) {
      } else {
        this.setState({ message: "Disconnected" });
        console.log("🚫 CANNOT ACCCESS METAMASK");
      }
    } catch (error: any) {
      this.setState({ message: "MetaMask Error" })
      console.log(error)
    };
  }

  addListeners = () => {
    window.addEventListener("load", async (event: any) => {
      console.log("🎧 LISTENING...")
      window.ethereum.on('message', (msg: any) => console.log(msg))
      window.ethereum.on("chainChanged", (msg: any) => {
        console.log(msg); window.location.reload()
      });
      window.ethereum.on("connect", (msg: any) => {
        this.getUserData(); console.log(msg)
      });
      window.ethereum.on("disconnect", (msg: any) => {
        console.log(msg)
      });
      window.ethereum.on("accountsChanged", (msg: any) => {
        console.log(msg); window.location.reload()
      });
      console.log(event)
    })
  }

  removeListeners = async () => {
    window.ethereum.removeListeners('message', (msg: any) => console.log(msg))
    window.ethereum.removeListeners("chainChanged", (msg: any) => {
      console.log(msg); window.location.reload()
    });
    window.ethereum.removeListeners("connect", (msg: any) => {
      this.getUserData(); console.log(msg)
    });
    window.ethereum.removeListeners("disconnect", (msg: any) => {
      console.log(msg)
    });
    window.ethereum.removeListeners("accountsChanged", (msg: any) => {
      console.log(msg); window.location.reload()
    });
  }

  getUserData = async () => {

    try {
      let name = 'Unknown';
      let network: any;
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await signer.getBalance();
      const chainId = await signer.getChainId();
      for (let x = 0; x < await this.state.networks.length; x++) {
        if (chainId === this.state.networks[x].id) {
          name = this.state.networks[x].networkName;
          network = this.state.networks[x];
        }
      }
      if (!network) {
        network = { btn: "light" };
      }
      const message = `${address.slice(0, 5)}♦${address.slice(-4)} | ${name}`

      console.log(message)
      this.setState({
        provider,
        signer,
        address,
        balance,
        chainId,
        message,
        network
      });
    } catch (error: any) {
      this.setState({ message: "MetaMask Error" });
      console.log("🚫 ERROR IN ETHERS.JS", error);
    }
  };


  fetchDB = async () => {
    const newsData = await window.fetch(
      'https://web3scraper-default-rtdb.firebaseio.com/news/data.json?print=pretty'
    )
    const newsJson = await newsData.json();
    this.setState({ news: newsJson });
    console.log(newsJson)
  }

  fetchNetworks = async () => {
    const networksData = await window.fetch(
      'https://web3scraper-default-rtdb.firebaseio.com/networks/data.json?print=pretty'
    );
    const networks = await networksData.json();
    this.setState({ networks });
    console.log(networks)
  };

  render() {
    while (true) {
      if (!this.state.news) {
        return (
          <div className="App">
            <div className='App-abyss'></div>
            <div className='App-abyss'></div>
            <Spinner animation="border" variant={this.state.network.btn} role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <br />
            <strong className={`text-${this.state.network.btn}`}>{this.state.message}</strong>
          </div>
        );
      } else {
        return (
          <div className="App">
            <Container >
              <StoppableMarquee
                news={this.state.news}
                color={this.state.network.btn}
                network={this.state.network}
                networks={this.state.networks}
              ></StoppableMarquee>

              <div className="App-abyss"></div>
              <footer>
                <Row >
                  <Col
                    xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}
                  >
                    <strong
                      className={`text-${this.state.network.btn} App-link App-banner App-pointer`}
                      title='Explorer'
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${this.state.network.explorer}address/${this.state.address}`, "_blank");
                      }}
                    >
                      {this.state.message}
                    </strong>
                  </Col>
                  <Col
                    xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}
                  >
                  </Col>

                  <Col
                    className={`text-${this.state.network.btn} App-link`}
                    xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}
                  >
                    <MITModal color={this.state.network.btn} time={this.state.time}></MITModal>
                  </Col>
                </Row>
              </footer>
            </Container>
            <br />
          </div>
         
        );
      }

    }
  }

}
export default App;

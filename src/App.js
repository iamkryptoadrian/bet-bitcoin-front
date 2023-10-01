import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/Signup";
import Home from "./components/dashboard/Home";
import Deposit from "./components/dashboard/Deposit";
import Withdraw from "./components/dashboard/Withdraw";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword"
import bg1 from './image/bg05.png';
import bg2 from './image/bg04.png';
import bg3 from './image/bg3.png';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import {  bsc,polygonMumbai } from 'wagmi/chains'
import config from './config'
const chains = [bsc,polygonMumbai]
const projectId = config.projectId

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  
  return (
    <>
    <WagmiConfig config={wagmiConfig}>

    <Router>
    <div className="relative w-full imgIndex -z-50 ">
      <div className="absolute  top-0  left-0">
           <img src={bg1}  alt="bg01"/>
      </div>
      <div className="absolute  top-0 left-0  md:block hidden">
           <img  src={bg2} alt="bg02"/>
      </div>
      <div className="absolute  sm:top-0 top-80 right-0 sm:w-96  w-40">
           <img  src={bg3} alt="bg02"/>
      </div>
    </div>


    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />

      <Route path="signup" element={<Signup />} />
      <Route path="Dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="deposit" element={<Deposit />} />
      
      </Route>
    </Routes>
  </Router>
  </WagmiConfig>

<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
   
  );
}

export default App;

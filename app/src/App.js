import './App.css';
import Main from "./components/Main"
import React from "react"
import { Routes,Route } from "react-router-dom"
import Create from "./components/Create"
import Join from "./components/Join"
import Error from "./components/Error"
import Room from "./components/Room"
/* import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';*/
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import "@solana/wallet-adapter-react-ui/styles.css"


import { useState, useMemo, useEffect } from "react"


const opts = {
  preflightCommitment: "processed"
}

function App() {

  const endpoint = "http://127.0.0.1:8899"
  const wallets = useMemo(
    () => [
    new PhantomWalletAdapter(),
    ],[]);


  return (


    <ConnectionProvider endpoint= {endpoint} >
      <WalletProvider wallets= { wallets } autoConnect >
        <WalletModalProvider>
            <Routes>
              <Route path="/" element={ <Main /> } />
              <Route path="/create" element={ <Create />} />
              <Route path="/join" element={ <Join />} />
              <Route path="*" element={<Error />} />
              <Route path="/join/:roomId" element={ <Room />} />
            </Routes>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;

    
    
    




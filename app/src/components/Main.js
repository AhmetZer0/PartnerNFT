import React from "react"
import {Link } from "react-router-dom"
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"

export default function Main(){
    const { connected } = useWallet()
    const handleWallet = () =>{
        !connected ? console.log("Please Connect your wallet") : console.log("Congrats");
    }
    
    console.log(connected)
    return (
        <div className="main">
            <div className="main--empty"><p className="font" id="create"><WalletMultiButton />{connected ? <WalletDisconnectButton /> : null }</p></div>     
            <div className="main--join"><Link to={connected ? "/create" : "#"}  onClick={ handleWallet }className="main--link"><p id="join" className="font">Create A Room </p></Link></div>
            <div className="main--create" ><Link to={connected ? "/join" : "#"} className="main--link" ><p className="font" id="create">Join A Room</p></Link></div>
        </div>

    )
}
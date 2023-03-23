import React from "react"
import {Link } from "react-router-dom"
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main(){
    const { connected } = useWallet()
    const handleWallet = () =>{
        if (!connected){
            toast.error('Connect your wallet!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    
    console.log(connected)
    return (
        <div className="main">
            <div className="main--empty"><p className="font" id="create"><WalletMultiButton />{connected ? <WalletDisconnectButton /> : null }</p></div>     
            <div className="main--join"><Link to={connected ? "/create" : "#"}  onClick={ handleWallet }className="main--link"><p id="join" className="font">Create A Room </p></Link></div>
            <div className="main--create" ><Link to={connected ? "/join" : "#"}   onClick={ handleWallet } className="main--link" ><p className="font" id="create">Join A Room</p></Link></div>
        </div>

    )
}
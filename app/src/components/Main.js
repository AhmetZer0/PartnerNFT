import React from "react"
import {Link } from "react-router-dom"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"


export default function Main(){
    return (
        <div className="main">

            <div className="main--empty"><p className="font" id="create"><WalletMultiButton /></p></div>
            <div className="main--join"><Link to="/create" className="main--link" ><p id="join" className="font">Create A Room</p></Link></div>
            <div className="main--create" ><Link to="/join" className="main--link" ><p className="font" id="create">Join A Room</p></Link></div>
        </div>

    )
}
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import collection from "../collection.json"
import { useAppContext } from "../context";


export default function Create(){
    const navigate = useNavigate();
    const collectionsName = collection.result.data;

    
    

    console.log("What is the problem here.")
    function handleSubmit( event ){
        event.preventDefault();

        navigate("/join")
    }

    function handleInvalid(){
        return "This place can not be empty !"
    }

    return (
		<form onSubmit>
			<div className="Room">
				<div><WalletMultiButton /></div>
				<h1>Create Room</h1>
				<select className="Room--inputs">
					{collectionsName.map((name) => <option value={name.name} className="room--options" key={name.url}>{name.name}</option>)}
				</select>
				<br />
				<input type="text" placeholder="Paste your partner's public key" 
					className="Room--inputs" required 
					onInvalid={ handleInvalid }
					/>
				<br />
				<button id="room--button">Create</button>
				<h1><Link to="/">Go Back to main</Link></h1>
			</div>
		</form>
        )
    
        
        
    
}
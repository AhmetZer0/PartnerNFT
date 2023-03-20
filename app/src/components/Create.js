import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import collection from "../collection.json"


export default function Create(){
	const LINK = "";
    const navigate = useNavigate();
    const collectionsName = collection.result.data;
	const [selected, setSelected ] = useState();
	const [floor , setFloor] = useState();
	const [url, setUrl] = useState();
	const [src, setSrc] = useState();

	

    function handleSubmit( event ){
        event.preventDefault();

        navigate("/join")
    }
	console.log(selected);

	function handleChange(e){
		setSelected(e.target.value);
		collectionsName.map((collName) => {
			if (collName.name === e.target.value){
				setFloor(collName.floor);
				setSrc("https://media.howrare.is/images/project_logo"+collName.url+".jpg");
				}
			})
		}

		
	

	const img = (LINK + url+".jpg");

    return (
		<form onSubmit>
			<div className="Room">
				<div><WalletMultiButton /></div>
				<h1>Create Room</h1>
				<select className="Room--inputs" onChange={handleChange}>
					{collectionsName.map((name) => <option value={name.name} className="room--options" key={name.url}>{name.name}</option>)}
				</select>
				<br />
				<img src={src} className="Collectionimage"/>
				<br />
				<label>Floor: {floor}</label>
				<br/>
				<button id="room--button">Create</button>
				<h1><Link to="/">Go Back to main</Link></h1>
			</div>
		</form>
        )
    
        
        
    
}
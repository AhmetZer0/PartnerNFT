import React from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Create(){
    const navigate = useNavigate();

    function handleSubmit( event ){
        event.preventDefault();

        navigate("/join")
    }

    function handleInvalid(){
        return "This place can not be empty !"
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="Room">
                <h1>Create Room</h1>
                <input type="text" placeholder="Which NFT ?" className="Room--inputs" required/>
                <br />
                <input type="text" placeholder="How many people will be in room ?" 
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
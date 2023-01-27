import { React, useState } from "react"
import { Link, useNavigate } from "react-router-dom"



export default function Join(){
    const [ roomid, setRoomid ] = useState("")
    const navigate = useNavigate();

    function handleSubmit( event ){
        event.preventDefault();
        navigate("/join/"+roomid)
    }
    return (

        <form onSubmit={ handleSubmit }>
            <div className="Room">
                <h1>Join Room</h1>
                <input type="text" name="roomid" onChange={e => setRoomid(e.target.value) } value={roomid} placeholder="Room ID" className="Room--inputs" id="join--input" required/>
                <br />
                <button id="join--button">Join</button>
                <h1><Link to="/">Go Back to main</Link></h1>
            </div>
        </form>
    )

}
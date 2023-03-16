import React from "react"
import { Link } from "react-router-dom"


export default function Error(){
    const styles = {
        color:"white"
    }
    return (
        <>
            <h1 style={styles}>Page Not Found!</h1>
            <h1><Link to="/">Go Back to main</Link></h1>
        </> 
    )

}
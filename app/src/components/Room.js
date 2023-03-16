import { React, useState } from "react";
import { Link } from "react-router-dom";

export default function Room(  ){
    
    const [ buy, setBuy ] = useState(true)
    const [ sell, setSell ] = useState(false)
    return (
        <>
            <div className="randomRoom--buttons">
                    <button className="room--buttons" onClick={ () => { setSell(false); setBuy(true) } }>Buy</button>
                    <button className="room--buttons" id="sell" onClick={ () => { setBuy(false); setSell(true) } }>Sell</button>
            </div>
            <div className="randomRoom">
                {buy && <div className="room--contents">
                    <table className="room--table">
                        <tr>
                            <td>Wallet 1</td>
                            <td>X</td>
                            <td><button>Buy</button></td>
                        </tr>
                        <tr>
                            <td>Wallet 2</td>
                            <td>X</td>
                            <td><button>Buy</button></td>
                        </tr>
                    </table>
                </div>}
                {sell && <div className="room--contents">
                <table className="room--table">
                        <tr>
                            <td>Wallet 1</td>
                            <td>X</td>
                            <td><button>Sell</button></td>
                        </tr>
                        <tr>
                            <td>Wallet 2</td>
                            <td>X</td>
                            <td><button>Sell</button></td>
                        </tr>
                    </table>
                    
                </div>
                }
                <h1><Link to="/">Go Back to main</Link></h1>
            </div>
        </>

       

    )
}
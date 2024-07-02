import * as React from "react"

import {useRef, useEffect} from "react"

import useClientState from "../use-client.jsx"

const P5 = ({sketch, className}) => {

    const   renderRef = useRef();

    useEffect( () => {

        const p5 = require("p5");

        sketch({p5, renderRef})

    },[])

    return (

        <div className={className} ref={renderRef}>
        </div>

    )

}

export default P5



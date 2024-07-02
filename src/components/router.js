import React from "react"

import { Router, Location } from "@reach/router"

import {AnimatePresence} from "framer-motion"

const CustomRouter = ({ children }) => (
  <Location>
    {({ location }) => (

      <AnimatePresence mode='wait'>
       
          <Router primary={false} location={location} key={location.pathname}>{children}</Router>

      </AnimatePresence>
        
    )}
  </Location>

)

export default CustomRouter
import React from "react"

import { Router, Location } from "@reach/router"

const CustomRouter = ({ children }) => (
  <Location>
    {({ location }) => (
       
          <Router location={location}>{children}</Router>
        
    )}
  </Location>
)

export default CustomRouter
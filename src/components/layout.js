import React, {useState, useEffect} from "react";

import useMobileWindow from "./partials/mobile-window"
import useScrolled from "./partials/use-scrolled"

import "normalize.css"
import "./styles/general.module.css"
import "./styles/typography.module.css"

import * as generalStyles from "./styles/general.module.css"
import * as containerStyles from "./styles/containers.module.css"
import * as headerStyles from "./styles/header.module.css"

import "./styles/media.queries.module.css"

import Header from "./header";
import menuLinks from "./menu-links"

const Layout = ({ children, path}) => {

	const 	[isToggled, setToggle] = useState(false),
			toggleMenu = (toggleState) => {
				!isToggled ? setToggle(toggleState) : setToggle(false);
			},
			mobileWindow = useMobileWindow(),
			scrollY = useScrolled().value,
			checkToggleState = () => { return isToggled && mobileWindow ? true : false };



	const checkChildren = () => {

		return children.length !== undefined ? children.filter( (c)=>{ 

			return c.props.prop !== 'homepage'

		} ) : children;
	};

	return path.pathname === "test" ? (

			<main className={`${containerStyles.homepage} ${containerStyles.flex_column} ${containerStyles.justify_center} ${containerStyles.inner}`} >{children}</main> 

	) : (

		<div style={{top: unset}} className={`${containerStyles.page} ${containerStyles.grid} ${containerStyles._15_85} ${headerStyles.head_space} ${generalStyles.position_relative} ${checkToggleState() ? generalStyles.locked : ''}`}>

			<Header paths={menuLinks} layout={path.pathname} isToggled={checkToggleState} setToggle={setToggle} toggleMenu={toggleMenu}/>

			<main className={`${containerStyles.inner}`}>{checkChildren()}</main> 

		</div>

	)

}

export default Layout;
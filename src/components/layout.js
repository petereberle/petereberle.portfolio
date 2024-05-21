import * as React from "react";

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

	const checkChildren = () => {

		return children.length !== undefined ? children.filter( (c)=>{ 

			return c.props.prop !== 'homepage'

		} ) : children;
	}

	return path.pathname === "test" ? (

			<main className={`${containerStyles.homepage} ${containerStyles.flex_column} ${containerStyles.justify_center} ${containerStyles.inner}`} >{children}</main> 

	) : (

		<div className={`${containerStyles.page} ${containerStyles.grid} ${containerStyles._15_85} ${headerStyles.head_space} ${generalStyles.position_relative}`}>

			<Header paths={menuLinks} layout={path.pathname}/>

			<main className={`${containerStyles.inner}`}>{checkChildren()}</main> 

		</div>

	)

}

export default Layout;
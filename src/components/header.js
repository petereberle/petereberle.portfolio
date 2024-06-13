import React from "react";

import { Link } from "@reach/router";

import {motion} from "framer-motion"

import * as generalStyles from "./styles/general.module.css"
import * as headerStyles from "./styles/header.module.css"
import * as containerStyles from "./styles/containers.module.css"
import * as typographyStyles from "./styles/typography.module.css"

const Header = ({ paths, layout, isToggled, setToggle, toggleMenu}) => {

	const	currentPage = layout,
			Menu = () => (
				<div className={`${headerStyles.menu_wrapper} ${containerStyles.sidebar} ${generalStyles.position_sticky} ${isToggled() ? headerStyles.active : ''}`}>
					<div className={`${containerStyles.sidebar_inner} ${generalStyles.position_sticky}`}>
						<ul className={`${headerStyles.menu} ${containerStyles.flex_column} ${generalStyles.full_height}`}>
							<MenuLinks linkStyle={(l)=>(<span>{l}</span>)} />
						</ul>
					</div>
				</div>
			),
			MenuLinks = ({linkStyle}) => (

						paths.map( (l, i) => {

							const urlParam = '/' + l.toLowerCase() + '/';

							return (

								<button key={i}>
									<Link target="_blank" className={`${currentPage.includes(urlParam) ? generalStyles.active : ''} ${headerStyles.menu_item} ${generalStyles.item} ${i === paths.length-1 ? generalStyles.last : ''}`} path={l} to={`${urlParam}`} onClick={ () => { toggleMenu(false) } }>{linkStyle(l)}</Link>
								</button> 
					
							)

						})
			);

	return (
		<>	
			<div className={`${headerStyles.header} ${isToggled() ? headerStyles.active : ''}`}>
				<div className={`${headerStyles.header_wrapper} ${containerStyles.flex_row} ${containerStyles.align_center} ${containerStyles.justify_center}`}>
					<div className={`${headerStyles.header_inner} ${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
						<Link target="_blank" onClick={ () => { toggleMenu(false) } } className={`${headerStyles.menu_item} ${generalStyles.last}`} to='/'><h3 className={generalStyles._0_margin}>Peter Eberle</h3></Link> 
						<button className={`${headerStyles.menu_item} ${headerStyles.toggle_wrapper}`} onClick={ () => { toggleMenu(true) } }>
							<ul className={`${headerStyles.toggle_inner} ${isToggled() ? headerStyles.active : ''}`}>
								<li id={headerStyles.toggle_1} className={`${headerStyles.toggle}`}/>
								<li id={headerStyles.toggle_2}  className={`${headerStyles.toggle}`}/>
							</ul>
						</button>
					</div>
				</div>
			</div>

			<Menu/>
		</>
	)

}

export default Header
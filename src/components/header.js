import * as React from "react";

import { Link } from "@reach/router";

import {motion} from "framer-motion"

import {useStaticQuery, graphql} from "gatsby"

// import P5 from "../components/partials/p5/p5"
// import Sketch from '../components/partials/p5/sketch';

import MenuToggle from "./partials/menu-toggle"

import useScrolled from "./hooks/use-scrolled"
import useMobileWindow from "./hooks/use-mobile-window"
import useResumeFile from "./hooks/use-resume-file"

import GradientBackground from "./partials/gradient-background"

import * as generalStyles from "./styles/general.module.css"
import * as headerStyles from "./styles/header.module.css"
import * as containerStyles from "./styles/containers.module.css"

const Header = ({ paths, layout, isToggled, setToggle, toggleMenu}) => {

	const 	{site} = useStaticQuery(graphql`

				query SiteQuery {
					 site {
						siteMetadata {
							title
						}
					}
				}

			`),
			resumeFiles = useResumeFile().edges,
			siteTitle = site.siteMetadata.title;

	const 	currentPage = layout,
			scrollValue = useScrolled().value,
			isMobile = useMobileWindow(),
			isInitialScroll = !isToggled && isMobile && scrollValue > 65,
			isScrollThreshold = !isToggled && isMobile && scrollValue > 200;
		 	
	const	MenuLinks = ({linkStyle}) => (

						paths.map( (l, i) => {

							const urlParam = '/' + l.toLowerCase() + '/';

							return (

									<Link target="_blank" key={i} className={`${currentPage.includes(urlParam) ? generalStyles.active : ''} ${headerStyles.menu_item} ${generalStyles.item}`} path={l} to={`${urlParam}`} onClick={ () => { toggleMenu(false) } }>
										<button>
											{linkStyle(l)}
										</button> 
									</Link> 
					
							)

						})
			);

	const ResumeLinks = () => (

		resumeFiles.map((file, i) => {

			const filePath = file.node.publicURL;

			return (
				<a target="_blank" rel="noopener" key={i} className={`${headerStyles.menu_item} ${generalStyles.item} ${generalStyles.last}`} href={filePath}>
					<button>
						<h4>Resume</h4>
					</button> 
				</a> 

			)

		} )

	)

	return (
		<div className={`${headerStyles.header} ${containerStyles.flex_row} ${containerStyles.full_width} ${containerStyles.justify_space_between} ${ isInitialScroll ? headerStyles.scrolled : '' } ${ isScrollThreshold ? headerStyles.threshold : '' } ${isToggled ? headerStyles.active : ''}`}>	
				
				<div className={`${headerStyles.header_wrapper} ${containerStyles.flex_row} ${containerStyles.full_width} ${containerStyles.align_center}`}>
					{/*<GradientBackground currentPage={currentPage}/>*/}
					<div className={`${headerStyles.header_inner} ${containerStyles.flex_row}`}>
						<Link target="_blank" onClick={ () => { toggleMenu(false) } } className={`${headerStyles.menu_item} ${generalStyles.last}`} to='/'><h4 className={generalStyles._0_margin}>{siteTitle}</h4></Link> 
					</div>
				
					<div className={`${headerStyles.menu_wrapper} ${isToggled ? headerStyles.active : ''}`}>
						<div className={`${headerStyles.menu_inner}`}>
							<ul className={`${containerStyles.flex_row} ${containerStyles.full_width}`}>
								<MenuLinks linkStyle={(l)=>(<h4>{l}</h4>)} />
								<ResumeLinks />
							</ul>
							{/*<P5 sketch={Sketch} className={`${headerStyles.menu_animation}`}/>*/}
						</div>
					</div>

				</div>

				<div className={`${headerStyles.nav_glyph} ${containerStyles.flex_column} ${containerStyles.justify_center} ${generalStyles.item}`}/>

				<MenuToggle isToggled={isToggled} toggleMenu={toggleMenu} initialState={true} visibility={false}/>
		</div>
	)

}

export default Header
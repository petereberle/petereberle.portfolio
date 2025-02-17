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
						<span>Resume</span>
					</button> 
				</a> 

			)

		} )

	)

	return (
		<>	
				<div className={`${headerStyles.header} ${ isInitialScroll ? headerStyles.scrolled : '' } ${ isScrollThreshold ? headerStyles.threshold : '' } ${isToggled ? headerStyles.active : ''}`}>
					<div className={`${headerStyles.header_wrapper} ${containerStyles.flex_row} ${containerStyles.align_center} ${containerStyles.justify_center}`}>
						<GradientBackground currentPage={currentPage}/>
						<div className={`${headerStyles.header_inner} ${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
							<Link target="_blank" onClick={ () => { toggleMenu(false) } } className={`${headerStyles.menu_item} ${generalStyles.last}`} to='/'><h3 className={generalStyles._0_margin}>{siteTitle}</h3></Link> 
							<MenuToggle isToggled={isToggled} toggleMenu={toggleMenu} initialState={true} visibility={false}/>
						</div>
					</div>
				</div>
				<div className={`${headerStyles.menu_wrapper} ${containerStyles.sidebar} ${generalStyles.position_sticky} ${isToggled ? headerStyles.active : ''}`}>
					<div className={`${containerStyles.sidebar_inner} ${headerStyles.menu_inner} ${generalStyles.position_sticky}`}>
						<ul className={`${containerStyles.flex_column} ${generalStyles.full_height}`}>
							<MenuLinks linkStyle={(l)=>(<span>{l}</span>)} />
							<ResumeLinks />
						</ul>
						{/*<P5 sketch={Sketch} className={`${headerStyles.menu_animation}`}/>*/}
					</div>
				</div>
		</>
	)

}

export default Header
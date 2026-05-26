import * as React from "react";

import { Link } from "@reach/router";

import {motion} from "framer-motion"

import {useStaticQuery, graphql} from "gatsby"

// import P5 from "../components/partials/p5/p5"
// import Sketch from '../components/partials/p5/sketch';

import MenuToggle from "./partials/menu-toggle"

import useScrolled from "./hooks/use-scrolled"
import useMobileWindow from "./hooks/use-mobile-window"

import GradientBackground from "./partials/gradient-background"

import * as generalStyles from "./styles/general.module.css"
import * as headerStyles from "./styles/header.module.css"
import * as containerStyles from "./styles/containers.module.css"

const Header = ({ paths, layout, isToggled, setToggle, toggleMenu}) => {

	const 	{site, activeResume, fallbackResume} = useStaticQuery(graphql`

				query SiteQuery {
					 site {
						siteMetadata {
							title
						}
					}
					activeResume: markdownRemark(
						frontmatter: { type: { eq: "resume" }, active: { eq: true } }
					) {
						frontmatter {
							slug
						}
					}
					fallbackResume: file(
						sourceInstanceName: { eq: "resume-file" }
						extension: { eq: "pdf" }
						name: { eq: "Peter_Eberle_Resume_2024" }
					) {
						publicURL
					}
				}

			`),
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

									<Link key={i} className={`${currentPage.includes(urlParam) ? generalStyles.active : ''} ${headerStyles.menu_item} ${generalStyles.item}`} path={l} to={`${urlParam}`} onClick={ () => { toggleMenu(false) } }>
										{linkStyle(l)}
									</Link> 
					
							)

						})
			);

	const resumePath = activeResume
		? `/resume/${activeResume.frontmatter.slug}/`
		: fallbackResume?.publicURL;

	const ResumeLink = () => resumePath ? (
		<a target="_blank" rel="noopener" className={`${headerStyles.menu_item} ${generalStyles.item} ${generalStyles.last}`} href={resumePath}>
			<button>
				<h4 className={`${generalStyles._0_margin}`}>CV</h4>
			</button>
		</a>
	) : null;

	return (
		<div className={`${headerStyles.header} ${generalStyles.fixed_top_centered} ${containerStyles.flex_row} ${containerStyles.full_width} ${containerStyles.justify_space_between} ${ isInitialScroll ? headerStyles.scrolled : '' } ${ isScrollThreshold ? headerStyles.threshold : '' } ${isToggled ? headerStyles.active : ''}`}>	
				
				<div className={`${headerStyles.header_wrapper} ${containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.full_width} ${containerStyles.align_center}`}>
					{/*<GradientBackground currentPage={currentPage}/>*/}
					<div className={`${headerStyles.header_inner} ${containerStyles.flex_row} ${isToggled ? headerStyles.active : ''}`}>
						<Link onClick={ () => { toggleMenu(false) } } className={`${headerStyles.menu_item} ${generalStyles.last}`} to='/'> <button> <h4 className={`${generalStyles._0_margin}`}>{siteTitle}</h4> </button> </Link> 
					</div>
				
					<div className={`${headerStyles.menu_wrapper} ${isToggled ? headerStyles.active : ''}`}>
						<div className={`${headerStyles.menu_inner}`}>
							<div className={`${containerStyles.flex_row} ${containerStyles.full_width} ${headerStyles.menu_list}`}>
								<MenuLinks linkStyle={(l)=>( <button> <h4 className={`${generalStyles._0_margin}`} >{l}</h4> </button>)} />
								<ResumeLink />
							</div>
							{/*<P5 sketch={Sketch} className={`${headerStyles.menu_animation}`}/>*/}
						</div>
					</div>

				</div>

				{/*<div className={`${headerStyles.nav_glyph} ${containerStyles.flex_column} ${containerStyles.justify_center} ${generalStyles.item}`}/>*/}

				<MenuToggle isToggled={isToggled} toggleMenu={toggleMenu} initialState={true} visibility={false}/>
		</div>
	)

}

export default Header

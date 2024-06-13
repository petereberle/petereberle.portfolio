import React from "react"

import {Link} from "gatsby"

import useMobileWindow from "../partials/mobile-window"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"

const ProjectNavigation = ({projectTags, pageContext}) => {

	const	mobileWindow = useMobileWindow(),
			allTags = pageContext.tags,
			Tags = ({tags}) => (tags.map(
					(t) => (

						
							<Link className={`${generalStyles.tag} ${projectTags.includes(t) ? generalStyles.active : ''}`} key={t} to={`/projects/#${t}`}><button>{t.toUpperCase()}</button></Link>
				

					)
				) 
			),
			Navigation = () => {

				const 	prevProject = pageContext.prev ? {url: `/projects${pageContext.prev.fields.slug}`, title: pageContext.prev.frontmatter.title} : null,
						nextProject = pageContext.next ? {url: `/projects${pageContext.next.fields.slug}`, title: pageContext.next.frontmatter.title} : null;

				return (
					<>

					{ prevProject && <Link className={generalStyles.tag} to={`${prevProject.url}#previous_project`}>
							<button className={`${generalStyles.navigation} ${generalStyles.prev}`}>{prevProject.title}</button>
						</Link>}
					{ nextProject && <Link className={generalStyles.tag} to={`${nextProject.url}#next_project`}>
						<button className={`${generalStyles.navigation} ${generalStyles.next}`}>{nextProject.title} </button>
						</Link>}
				
					</>
				)
			};

	return (

		<>

		<div className={containerStyles.flex_row}>

			<Tags tags={allTags} />

		</div>

		<div className={`${containerStyles.flex_row} ${mobileWindow ? containerStyles.flex_1_0_auto : ''}`}>

			<Navigation/>

		</div>

		</>
	)

}

export default ProjectNavigation
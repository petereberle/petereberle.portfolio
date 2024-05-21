import React from "react"

import {Link} from "gatsby"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"

const ProjectNavigation = ({projectTags, pageContext}) => {

	const	allTags = pageContext.tags,
			Tags = ({tags}) => (tags.map(
					(t) => (

						<button key={t} className={`${generalStyles.tag} ${projectTags.includes(t) ? generalStyles.active : ''}`}>
							<Link to={`/projects/#${t}`}>{t.toUpperCase()}</Link>
						</button>

					)
				) 
			),
			Navigation = () => {

				const 	prevProject = pageContext.prev ? {url: `/projects${pageContext.prev.fields.slug}`, title: pageContext.prev.frontmatter.title} : null,
						nextProject = pageContext.next ? {url: `/projects${pageContext.next.fields.slug}`, title: pageContext.next.frontmatter.title} : null;

				return (
					<>

					{ prevProject && (	<button className={`${generalStyles.tag} ${generalStyles.navigation} ${generalStyles.prev}`}>
											<Link to={prevProject.url}>{prevProject.title}</Link>
										</button>)}
					{ nextProject && (	<button className={`${generalStyles.tag} ${generalStyles.navigation} ${generalStyles.next}`}>
											<Link to={nextProject.url}>{nextProject.title}</Link>
										</button>)}
				
					</>
				)
			};

	return (

		<>

		<div className={containerStyles.flex_row}>

			<Tags tags={allTags} />

		</div>

		<div className={containerStyles.flex_row}>

			<Navigation/>

		</div>

		</>
	)

}

export default ProjectNavigation
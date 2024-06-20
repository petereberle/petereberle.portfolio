import React from "react"

import {Link} from "gatsby"

import useMobileWindow from "../partials/mobile-window"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"

const PostNavigation = ({urlParam, tags, pageContext}) => {

	const	upperDirectoryPath = '/' + urlParam.pathname.split('/')[1],
			mobileWindow = useMobileWindow(),
			allTags = pageContext.tags ? pageContext.tags : undefined,
			Tags = ({tags}) => (tags.map(
					(t) => (

						
							<Link className={`${generalStyles.tag} ${tags.includes(t) ? generalStyles.active : ''}`} key={t} to={upperDirectoryPath + '/#' + t}><button>{t.toUpperCase()}</button></Link>
				

					)
				) 
			),
			Navigation = () => {

				const 	prevPost = pageContext.prev ? {url: upperDirectoryPath + pageContext.prev.fields.slug, title: pageContext.prev.frontmatter.title} : null,
						nextPost = pageContext.next ? {url: upperDirectoryPath + pageContext.next.fields.slug, title: pageContext.next.frontmatter.title} : null;

				return (
					<>

					{ prevPost && <Link className={generalStyles.tag} to={`${prevPost.url}#previouspost`}>
							<button className={`${generalStyles.navigation} ${generalStyles.prev}`}>{prevPost.title}</button>
						</Link>}
					{ nextPost && <Link className={generalStyles.tag} to={`${nextPost.url}#nextpost`}>
						<button className={`${generalStyles.navigation} ${generalStyles.next}`}>{nextPost.title} </button>
						</Link> }
				
					</>
				)
			};

	return (

		<>

		<div className={containerStyles.flex_row}>

			{ allTags && <Tags tags={allTags} /> }

		</div>

		<div className={`${containerStyles.flex_row} ${mobileWindow ? containerStyles.flex_1_0_auto : ''}`}>

			<Navigation/>

		</div>

		</>
	)

}

export default PostNavigation
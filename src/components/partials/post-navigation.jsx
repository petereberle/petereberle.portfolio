import * as React from "react"

import {Link} from "gatsby"

import useMobileWindow from "../hooks/use-mobile-window"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"

const PostNavigation = ({urlParam, currentTags, pageContext}) => {

	const	upperDirectoryPath = '/' + urlParam.pathname.split('/')[1],
			allTags = pageContext.tags ? pageContext.tags : undefined,
			Tags = () => (allTags.map(
					(t) => {

						return <Link className={`${generalStyles.tag} ${currentTags?.includes(t) ? generalStyles.active : ''}`} key={t} to={upperDirectoryPath + '/#' + t}><button>{t.toUpperCase()}</button></Link>

					}
				) 
			),
			Navigation = () => {

				const 	prevPost = pageContext.prev ? {url: upperDirectoryPath + pageContext.prev.fields.slug, title: pageContext.prev.frontmatter.title} : null,
						nextPost = pageContext.next ? {url: upperDirectoryPath + pageContext.next.fields.slug, title: pageContext.next.frontmatter.title} : null;

				return (
					<>

					{ prevPost && <Link className={`${generalStyles.tag} ${generalStyles.navigation_tag}`}  to={`${prevPost.url}#previouspost`}>
							<button className={`${generalStyles.navigation} ${generalStyles.prev}`}>{prevPost.title}</button>
						</Link>}
					{ nextPost && <Link className={`${generalStyles.tag} ${generalStyles.navigation_tag}`} to={`${nextPost.url}#nextpost`}>
						<button className={`${generalStyles.navigation} ${generalStyles.next}`}>{nextPost.title} </button>
						</Link> }
				
					</>
				)
			};

	return (

		<>

		<div className={`${containerStyles.flex_row} ${generalStyles.margin_negative}`}>

			{ allTags && <Tags/> }

		</div>

		<div className={`${generalStyles.margin_negative} ${containerStyles.flex_row} ${containerStyles.full_width} ${useMobileWindow() ? containerStyles.flex_1_0_auto : ''}`}>
		
			<Navigation/>

		</div>

		</>
	)

}

export default PostNavigation
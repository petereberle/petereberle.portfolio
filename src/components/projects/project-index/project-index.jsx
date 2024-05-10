"use client"

import * as React from "react";

const ProjectIndex = ({ node: {excerpt, frontmatter} }) => {

		const [isShown, show] = React.useReducer(() => true, false);

			return (

				<div>
					<button onClick={show}>Show</button>

					{isShown && <div dangerouslySetInnerHTML={{ __html: excerpt }} /> }

				</div>

			)

		}


export default ProjectIndex;
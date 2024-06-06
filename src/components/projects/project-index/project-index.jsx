"use client"

import React, {useState, useEffect} from "react";

import * as generalStyles from "../../styles/general.module.css"
import * as containerStyles from "../../styles/containers.module.css"

import IndexCards from "./index-card"
import FilterMenu from "./index-filter"

const ProjectIndex = ({ data, urlParam }) => {

	const 	[project, setProject] = useState(data),
			[filter, setFilter] = useState('all'),
			hash = urlParam.hash.substring(1);

	const menuItems = () => {

		const 	tagsArr = []; 

		data.map( (project) => (

			project.node.frontmatter.tags.map(

				(t) => tagsArr.push(t) 
			)
		))

		return [...new Set(tagsArr)]

	}

  	const filterProject = (currentTag) => {

    	const newProject = currentTag !== 'all' ? data.filter((project) => {

    		//Inside of filter, return projects with tags matching the filter option

      		return project.node.frontmatter.tags.includes(currentTag)

   		 }) : data;

    	setFilter(currentTag);

    	setProject(newProject);
  	};

  	useEffect( ()=> {

  		if ( menuItems().includes(hash) ) { 

  			filterProject(hash);

  		} else if (!hash || hash === undefined) {

  		 filterProject('all');

  		} 

  	}, [hash] )

	return ( 

		<div className={`${containerStyles.grid} ${containerStyles._15_85} ${containerStyles.inner}`}>

			<div className={`${containerStyles.sidebar} ${generalStyles.position_sticky} ${containerStyles.flex_column} ${generalStyles.full_height}`}>

					<FilterMenu data={data} filter={filter} filterProject={filterProject} setProject={setProject} menuItems={menuItems()} hash={hash}/>

			</div>

			<div className={`${containerStyles.index}`}>

	         	<IndexCards className={containerStyles.index} project = {project} />

	        </div>

		</div>

	)
}


export default ProjectIndex;
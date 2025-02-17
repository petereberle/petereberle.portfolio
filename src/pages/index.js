import * as React from "react";

import CustomRouter from "../components/router";

import useClientState from "../components/hooks/use-client"

import Layout from "../components/layout";

import About from "../components/about"
const Projects = React.lazy(() => import("../components/projects/projects"));
const Artwork = React.lazy(() => import("../components/artwork/artwork"));
const Contact = React.lazy(() => import("../components/contact"));

const LazyComponent = ({ Component, ...props }) => {

	if ( useClientState() === false ) {  return }

  return 	<React.Suspense fallback={<pre>{Component}</pre>}>
						<Component {...props} />
			</React.Suspense>
}


const MainPage = ({location}) => {

	return (

		<>

			<Layout path={location} >

				<CustomRouter>
						<About path="/" urlParam={location}/>
						<LazyComponent Component = {Projects} path="/projects/" urlParam={location}/>
						<LazyComponent Component = {Artwork} path="/artwork/" urlParam={location}/>
						<LazyComponent Component = {Contact} path="/contact/" urlParam={location}/>
				</CustomRouter>

			</Layout>

		</>

	)
	
}

export default MainPage



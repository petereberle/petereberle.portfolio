import React, {lazy, Suspense} from "react";

import CustomRouter from "../components/router";
import { Link } from "@reach/router";

// import SuspenseHelper from "../components/partials/suspense-helper"

import useClientState from "../components/partials/use-client"

import Layout from "../components/layout";

import Header from "../components/header";
import menuLinks from "../components/menu-links";

import * as containerStyles from "../components/styles/containers.module.css";

import About from "../components/about"

const Projects = lazy(() => import("../components/projects/projects"));
const Artwork = lazy(() => import("../components/artwork/artwork"));
const Contact = lazy(() => import("../components/contact"));

const LazyComponent = ({ Component, ...props }) => {

	if ( useClientState() === false ) {  return }

  return 	<Suspense fallback={<pre>{Component}</pre>}>
						<Component {...props} />
					</Suspense>
}


const MainPage = ({location}) => {

	return (

			<Layout path={location} >

				<CustomRouter>
						<About path="/" urlParam={location}/>
						<LazyComponent Component = {Projects} path="/projects/" urlParam={location}/>
						<LazyComponent Component = {Artwork} path="/artwork/" urlParam={location}/>
						<LazyComponent Component = {Contact} path="/contact/" urlParam={location}/>
				</CustomRouter>

			</Layout>

	)
	
}

export default MainPage



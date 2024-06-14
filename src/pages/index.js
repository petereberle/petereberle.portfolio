import React from "react";

import CustomRouter from "../components/router";
import { Link } from "@reach/router";

import Layout from "../components/layout";

import Header from "../components/header";
import menuLinks from "../components/menu-links";

import * as containerStyles from "../components/styles/containers.module.css";

import About from "../components/about"

const Projects = React.lazy(() => import("../components/projects/projects"));
const Artwork = React.lazy(() => import("../components/artwork/artwork"));
const Contact = React.lazy(() => import("../components/contact"));

const LazyComponent = ({ Component, ...props }) => (
  <React.Suspense fallback={null}>
    <Component {...props} />
  </React.Suspense>
)


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



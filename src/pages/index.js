import React from "react"

import CustomRouter from "../components/router"

import Layout from "../components/layout"
import Projects from "../components/projects/projects"

const About = React.lazy(() => import("../components/about"));

const LazyComponent = ({ Component, ...props }) => (
  <React.Suspense>
    <Component {...props} />
  </React.Suspense>
)


const MainPage = () => (

	<Layout>

		<a href="about">Test Router</a>

		<CustomRouter>
			<Projects path="/" />
			<LazyComponent Component = {About} path="about"/>
		</CustomRouter>

	</Layout>
	
)

export default MainPage



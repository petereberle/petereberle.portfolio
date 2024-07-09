import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "./partials/content-router-animation"

import ContactForm from "./partials/contact-form"

import * as generalStyles from "./styles/general.module.css";
import * as containerStyles from "./styles/containers.module.css";
import * as formStyles from "./styles/form.module.css";

const Contact = ({urlParam}) => {

  const {markdownRemark} = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { type: { eq: "contact" } }) {
              html
              frontmatter {
                title
                email
                phone
              }
            }
          }`

    )

    return (

      <ContentRouterAnimation urlParam={urlParam}>

        <div className={`${containerStyles.grid} ${containerStyles._25_75} ${containerStyles.width_subtract_padding}`}>

            <div className={`${containerStyles.flex_column} ${generalStyles.profile_card}`}>

              <h2 class="footer_item">{markdownRemark.frontmatter.title}</h2>

              <div dangerouslySetInnerHTML={{__html: markdownRemark.html}}/>

            </div>

          <div className={`${containerStyles.flex_column} ${generalStyles.profile_card}`}>
    
            <ContactForm/>
        
          </div>

      </div>

        </ContentRouterAnimation>

    )


}

export default Contact;
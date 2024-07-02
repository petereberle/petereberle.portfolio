import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "./partials/content-router-animation"

import * as generalStyles from "./styles/general.module.css";
import * as containerStyles from "./styles/containers.module.css";
import * as formStyles from "./styles/form.module.css";

const Contact = ({urlParam}) => {

  const {markdownRemark} = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { type: { eq: "contact" } }) {
              frontmatter {
                message
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

              <h2 class="footer_item">{markdownRemark.frontmatter.message}</h2>

              <p>Email: {markdownRemark.frontmatter.email} </p>

            </div>

          <div className={`${containerStyles.flex_column} ${generalStyles.profile_card}`}>
  
                <form name="contact_form" className={formStyles.form_container} enctype="text/plain" action="https://docs.google.com/forms/d/e/1FAIpQLScI4lRfEJDnz6W2GPLxZuaAVLZ8ZoyTCsMKfX7JBYFOzRfjhw/formResponse?" target="fake_redirect" onsumbmit="submitted=true;">

                  <label for="entry.1779284427">First and Last Name</label>
                  <input type="text" placeholder="First and Last Name" name="entry.1779284427" className={formStyles.form_input} id="entry.1779284427"/>

                  <label for="entry.433919051">Email</label>
                  <input type="text" placeholder="Email" name="entry.433919051" className={formStyles.form_input} id="entry.433919051"/>
                  
                  <label for="entry.242520132">Message</label>
                  <textarea className={formStyles.form_input} placeholder="Message" name="entry.242520132" id="entry.242520132" className={formStyles.form_text_area}></textarea>
                  
                  <div className={generalStyles.tag}>
                    <input class="clear footer_item" type="submit" value="Submit" id="send"></input>
                  </div>

                </form>

              
              <p className={`${formStyles.form_message} ${generalStyles.hide}`}>Please enter your name and email correctly</p>
              
              <p className={`${formStyles.form_message} ${generalStyles.hide}`}>Thank you! I'll be in touch soon.</p>
           
              <iframe name="fake_redirect" className={formStyles.form_redirect} onload="if(submitted) {}"></iframe>
        
           </div>

      </div>

        </ContentRouterAnimation>

    )


}

export default Contact;
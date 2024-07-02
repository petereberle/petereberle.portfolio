import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "./partials/content-router-animation"

import * as generalStyles from "./styles/general.module.css";
import * as containerStyles from "./styles/containers.module.css";
import * as formStyles from "./styles/form.module.css";

const Contact = ({urlParam}) => {

  const {markdownRemark} = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { title: { eq: "Contact" } }) {
              frontmatter {
                message
                email
              }
            }
          }`

    )

    return (

      <ContentRouterAnimation urlParam={urlParam}>
          <div className={`${containerStyles.flex_column} ${containerStyles.grid} ${containerStyles._50_50} `}>
            <h1 class="footer_item">{markdownRemark.frontmatter.message}</h1>
              <form name="contact_form" className={formStyles.form_container} enctype="text/plain" action="https://docs.google.com/forms/d/e/1FAIpQLScI4lRfEJDnz6W2GPLxZuaAVLZ8ZoyTCsMKfX7JBYFOzRfjhw/formResponse?" target="fake_redirect" onsumbmit="submitted=true;">
                <label for="entry.1779284427">First and Last Name</label>
                <input type="text" onchange="removeProp()" placeholder="First and Last Name" name="entry.1779284427" className={formStyles.form_input} id="entry.1779284427"/>
                <label for="entry.433919051">Email</label>
                <input type="text" onchange="removeProp()" placeholder="Email" name="entry.433919051" className={formStyles.form_input} id="entry.433919051"/>
                <label for="entry.242520132">Message</label>
                <textarea className={formStyles.form_input} placeholder="Message" name="entry.242520132" id="entry.242520132" className={formStyles.form_text_area} onchange="removeProp()"></textarea>
                <div className={generalStyles.tag}>
                  <input class="clear footer_item" type="submit" value="Submit" id="send"></input>
                </div>
              </form>
              <p className={`${formStyles.form_message} ${generalStyles.hide}`}>Please enter your name and email correctly</p>
              <p className={`${formStyles.form_message} ${generalStyles.hide}`}>Thank you! I'll be in touch soon.</p>
            <iframe name="fake_redirect" className={formStyles.form_redirect} onload="if(submitted) {}"></iframe>
        </div>
        </ContentRouterAnimation>

    )


}

export default Contact;
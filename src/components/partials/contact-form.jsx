import * as React from  "react"

import * as generalStyles from "../styles/general.module.css";
import * as containerStyles from "../styles/containers.module.css";
import * as formStyles from "../styles/form.module.css";

const ContactForm = () => {

	return (

		<>
		
			<form name="contact_form" className={`${formStyles.form} ${formStyles.form_container}`} enctype="text/plain" action="https://docs.google.com/forms/d/e/1FAIpQLScI4lRfEJDnz6W2GPLxZuaAVLZ8ZoyTCsMKfX7JBYFOzRfjhw/formResponse?" target="fake_redirect" onsumbmit="submitted=true;">

		      <label for="form.name">First and Last Name</label>
		      <input type="text" placeholder="First and Last Name" name="form.name" className={`${formStyles.form} ${formStyles.form_input}`}/>

		      {/*<label for="form.email">Email</label>*/}
		      <input type="text" placeholder="Email" name="form.email" className={`${formStyles.form} ${formStyles.form_input}`}/>
		      
		      <label for="form.message">Message</label>
		      <textarea className={formStyles.form_input} placeholder="Message" name="form.message" className={`${formStyles.form} ${formStyles.form_text_area}`}></textarea>
		      
		      <div className={generalStyles.tag}>
		        <input class="clear footer_item" type="submit" value="Submit" id="send"></input>
		      </div>

		    </form>
		              
			  <p className={`${formStyles.form_message} ${generalStyles.hide}`}>Please enter your name and email correctly</p>
			  
			  <p className={`${formStyles.form_message} ${generalStyles.hide}`}>Thank you! I'll be in touch soon.</p>

			  <iframe name="fake_redirect" className={formStyles.form_redirect} onload="if(submitted) {}"></iframe>

		</>

	)
}

export default ContactForm
import React, {useState, useRef, useEffect} from  "react"

import * as generalStyles from "../styles/general.module.css";
import * as containerStyles from "../styles/containers.module.css";
import * as formStyles from "../styles/form.module.css";

const ContactForm = () => {

	const 	formReference = {
				name : useRef(),
				email : useRef(),
				message : useRef()
			},
			[name, setName] = useState(''),
			[email, setEmail] = useState(''),
			[message, setMessage] = useState(''),
			[isSubmitted, setSubmitted] = useState(false),
			[isErrored, setErrored] = useState(false),
			handleSubmit = () => {

				const 	formValue = {
							name : formReference.name.current.value,
							email : formReference.email.current.value,
							message : formReference.message.current.value
						},
						formEmailValid = (email) => {
							return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
						},
						formError = formValue.name.length <= 0 || formValue.email.length <= 0 || !formEmailValid(formValue.email);
		
				if (formError ) {

					setSubmitted(false)
					setErrored(true)

				} else {


					setName('')
					setEmail('')
					setMessage('')
					setSubmitted(true)
					setErrored(false)
				}

			},
			handleReset = () => {

				setSubmitted(false)
				setErrored(false)

			}
 
	return (

		<>
		
			<form method="post" onSubmit={ handleSubmit } action="https://docs.google.com/forms/d/e/1FAIpQLScI4lRfEJDnz6W2GPLxZuaAVLZ8ZoyTCsMKfX7JBYFOzRfjhw/formResponse?" target="fake_redirect" name="contact_form" className={`${formStyles.form} ${formStyles.form_container} ${isSubmitted ? formStyles.collapse : ''}`} >

				<label htmlFor="entry.1779284427">First and Last Name</label>
				<input type="text" placeholder="First and Last Name" name="entry.1779284427" value={name} onChange={e => setName(e.target.value)} ref={formReference.name} className={`${formStyles.form} ${formStyles.form_input}`}/>

				<label htmlFor="entry.433919051">Email</label>
				<input type="text" placeholder="Email" name="entry.433919051" value={email} onChange={e => setEmail(e.target.value)} ref={formReference.email} className={`${formStyles.form} ${formStyles.form_input}`}/>

				<label htmlFor="entry.242520132">Message</label>
				<textarea className={formStyles.form_input} placeholder="Message" name="entry.242520132" value={message} onChange={e => setMessage(e.target.value)} ref={formReference.message} className={`${formStyles.form} ${formStyles.form_text_area}`}></textarea>

				<div className={`${generalStyles.margin_negative} ${containerStyles.flex_row} ${containerStyles.full_width}`}>

					<button type="submit" id="send" className={generalStyles.tag}>
						Submit
					</button>

					<button type="reset" id="reset" className={`${generalStyles.tag}`}>
						Reset
					</button>

				</div>

		    </form>

			{isSubmitted && !isErrored  && 
				<>
				<p className={`${formStyles.form_message}`}>Thank you! I'll be in touch soon.</p> 
				<button className={`${generalStyles.tag}`} onClick={ handleReset }>
			      	Reset
			     </button>
		      	</>
			}
			{isErrored && <p className={`${formStyles.form_message}`}>Oops! Please enter your name or verify your email address.</p> }

			  <iframe name="fake_redirect" className={formStyles.form_redirect}></iframe>

		</>

	)
}

export default ContactForm
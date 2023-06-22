import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const EmailContactForm = () => {
	const form = useRef();
	const [to_name, setTo_name] = useState('');

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_jtb5i97', 'template_r58detq', form.current, 'n57BsnxNIWol_iHXz')
			.then((result) => {
				console.log('merge ba');
				console.log(result);
			})
			.catch((error) => {
				console.error('aia e', error);
			});
			e.target.reset();
	};

	const handleNameChange = (e) => {
		setTo_name(e.target.value);
	};

	return (
		<form ref={form} onSubmit={sendEmail}>
			<label>Name</label>
			<input
				type="text"
				name="to_name"
				value={to_name}
				onChange={handleNameChange}
			/>
			<label>Email</label>
			<input type="email" name="user_email" />
			<label>Message</label>
			<textarea name="message" />
			<input type="submit" value="Send" />
		</form>
	);
};

export default EmailContactForm;

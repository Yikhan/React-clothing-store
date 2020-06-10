import './sign-in.styles.scss';

import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [ userCredentials, setCredentials ] = useState({ email: '', password: '' });
	const { email, password } = userCredentials;

	const handleSubmit = (event) => {
		event.preventDefault();

		emailSignInStart(email, password);
	};

	const handleChange = (event) => {
		const { value, name } = event.target;

		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2 className="title">I already have an account</h2>
			<span>Sign in with your email</span>

			<form onSubmit={handleSubmit}>
				<FormInput 
					name="email" 
					type="email" 
					label="email" 
					value={email} 
					onChange={handleChange} 
					required 
				/>
				<FormInput
					name="password"
					type="password"
					label="password"
					value={password}
					onChange={handleChange}
					required
				/>
				<div className="buttons">
					<CustomButton type="submit">Sign In</CustomButton>
					<CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn="true">
						Sign In With Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password))
});

export default connect(null, mapDispatchToProps)(SignIn);

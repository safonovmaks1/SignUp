import React, { useState } from 'react';
import { SignUpForm, SignUpFormHook } from '../components';
import styles from './App.module.css';

export const App = () => {
	const [toggle, setToggle] = useState(true);

	const handleClick = () => {
		setToggle(!toggle);
	};

	return (
		<div className={styles.app}>
			<button onClick={handleClick} class={styles.btn}>
				{toggle ? 'SignUp' : 'SignUp with React Hook Form'}
			</button>

			{toggle ? <SignUpForm /> : <SignUpFormHook />}
		</div>
	);
};

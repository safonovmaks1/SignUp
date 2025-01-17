import { useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.css';

export const SignUpForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		emailError: null,
		passwordError: null,
		confirmPasswordError: null,
	});

	const submitButtonRef = useRef(null);
	const inputFields = useRef({
		email: null,
		password: null,
		confirmPassword: null,
	});
	const { email, password, confirmPassword } = formData;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (email === '' || password === '' || confirmPassword === '') {
			setErrors({
				emailError: 'Поле не должно быть пустым',
				passwordError: 'Поле не должно быть пустым',
				confirmPasswordError: 'Поле не должно быть пустым',
			});
		} else if (password !== confirmPassword) {
			setErrors({
				confirmPasswordError: 'Пароли не совпадают',
			});
		} else {
			console.log(formData);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));

		const errors = {
			emailError: null,
			passwordError: null,
			confirmPasswordError: null,
		};

		if (name === 'email') {
			if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
				errors.emailError = 'Неверный формат Email';
			}
		} else if (name === 'password' && value.length < 6) {
			errors.passwordError = 'Поле должно содержать не менее 6 символов';
		} else if (name === 'confirmPassword' && password !== value) {
			errors.confirmPasswordError = 'Пароли не совпадают';
		} else if (!errors) {
			submitButtonRef.current.focus();
		}

		setErrors(errors);
	};

	useEffect(() => {
		if (Object.keys(errors).every((key) => errors[key] === null)) {
			submitButtonRef.current.focus();
		}
	}, [errors]);

	return (
		<div>
			<h2 className={styles.formTitle}>SignUp</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<input
						className={styles.formInput}
						type="email"
						name="email"
						placeholder="Почта"
						value={email}
						onChange={handleInputChange}
						ref={inputFields.current.email}
					/>
					{errors.emailError && (
						<div className={styles.error}>{errors.emailError}</div>
					)}
				</div>
				<div className={styles.formRow}>
					<input
						className={styles.formInput}
						type="password"
						name="password"
						placeholder="Пароль"
						value={password}
						onChange={handleInputChange}
						ref={inputFields.current.password}
					/>
					{errors.passwordError && (
						<div className={styles.error}>{errors.passwordError}</div>
					)}
				</div>
				<div className={styles.formRow}>
					<input
						className={styles.formInput}
						type="password"
						name="confirmPassword"
						placeholder="Повторите Пароль"
						value={confirmPassword}
						onChange={handleInputChange}
						ref={inputFields.current.confirmPassword}
					/>
					{errors.confirmPasswordError && (
						<div className={styles.error}>{errors.confirmPasswordError}</div>
					)}
				</div>
				<button
					className={styles.submitBtn}
					type="submit"
					ref={submitButtonRef}
					disabled={
						!!(
							errors.emailError ||
							errors.passwordError ||
							errors.confirmPasswordError
						)
					}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

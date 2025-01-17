import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../SignUp/SignUp.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			'Неверный формат поля Email',
		),
	password: yup.string().min(6, 'Поле должно содержать не менее 6 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const SignUpFormHook = () => {
	const submitButtonRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	useEffect(() => {
		if (Object.keys(errors).every((key) => errors[key] === null)) {
			submitButtonRef.current.focus();
		}
	}, [errors]);

	return (
		<div>
			<h2 className={styles.formTitle}>SignUp with React Hook Form</h2>
			<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
				<div className={styles.formRow}>
					<input
						className={styles.formInput}
						type="email"
						name="email"
						placeholder="Почта"
						{...register('email')}
					/>
					{emailError && <div className={styles.error}>{emailError}</div>}
				</div>
				<div className={styles.formRow}>
					<input
						className={styles.formInput}
						type="password"
						name="password"
						placeholder="Пароль"
						{...register('password')}
					/>
					{passwordError && <div className={styles.error}>{passwordError}</div>}
				</div>
				<div className={styles.formRow}>
					<input
						className={styles.formInput}
						type="password"
						name="confirmPassword"
						placeholder="Повторите Пароль"
						{...register('confirmPassword')}
					/>
					{confirmPasswordError && (
						<div className={styles.error}>{confirmPasswordError}</div>
					)}
				</div>
				<button
					className={styles.submitBtn}
					type="submit"
					ref={submitButtonRef}
					disabled={!!(emailError || passwordError || confirmPasswordError)}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

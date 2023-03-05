import React, { useState, useRef, MutableRefObject } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

async function createUser(email: string, password: string) {
	const response = await fetch('/api/auth/signup/', {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
		}),
		headers: {
			'content-type': 'application/json',
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'something went wrong');
	}

	return data;
}

function AuthForm() {
	const router = useRouter();
	const [isLogin, setIsLogin] = useState(true);

	const inputEmailRef = useRef() as MutableRefObject<HTMLInputElement>;
	const inputPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	async function submitHandler(event: Event | undefined) {
		event?.preventDefault();

		const email = (inputEmailRef?.current as HTMLInputElement).value;
		const password = (inputPasswordRef?.current as HTMLInputElement).value;

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: email,
				password: password,
			});
			if (!result?.error) {
				router.replace('/');
			}
		} else {
			try {
				const result = await createUser(email, password);
				console.log(result.message);
			} catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<section>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={() => submitHandler(event)}>
				<div>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={inputEmailRef} />
				</div>
				<div>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={inputPasswordRef}
					/>
				</div>
				<div>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button type='button' onClick={switchAuthModeHandler}>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;

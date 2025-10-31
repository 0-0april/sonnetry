import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriterLogin.css';

function WriterLogin() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		if (!username.trim() || !password) {
			setError('Please enter both username and password.');
			return;
		}

		setLoading(true);
		// Simulate an async login (replace with real auth later)
		setTimeout(() => {
			setLoading(false);
			if (username === 'writer' && password === 'password') {
				// simple demo token
				localStorage.setItem('sonnetry_auth', 'demo-token');
				navigate('/writer-panel');
			} else {
				setError('Invalid credentials. Try username "writer" and password "password".');
			}
		}, 700);
	};

	return (
		<div className="writer-login-page">
			<button type="button" className="back-btn" onClick={() => navigate('/')}>Back</button>
			<form className="writer-login-form" onSubmit={handleSubmit} aria-labelledby="login-heading">
				<h2 id="login-heading">Writer Login</h2>

				{error && (
					<div className="error" role="alert">
						{error}
					</div>
				)}

				<label className="field">
					<span>Username</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete="username"
						placeholder="username"
					/>
				</label>

				<label className="field">
					<span>Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
						placeholder="password"
					/>
				</label>

				<button className="submit" type="submit" disabled={loading}>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>

				<p className="forgot-password">forgot password?</p>
			</form>
		</div>
	);
}

export default WriterLogin;
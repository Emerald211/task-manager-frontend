'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../lib/auth';
import { api } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = getToken();
		if (!storedToken) {
			setLoading(false);
			return;
		}

		setToken(storedToken);

		api
			.profile(storedToken)
			.then((res) => {
        const userData = res.data?.user || res.user || res.data;
        setUser(userData);
			})
			.catch(() => {
				console.log('shshdhhdhd');
				clearToken();
				setToken(null);
				setUser(null);
			})
			.finally(() => setLoading(false));
	}, []);

	async function login(email, password) {
		const res = await api.login({ email, password });
		saveToken(res.data.token);
		setToken(res.data.token);
		setUser(res.data.user);
	}

	async function signup(name, email, password) {
		const res = await api.signup({ name, email, password });
		saveToken(res.data.token);
		setToken(res.data.token);
		setUser(res.data.user);
	}

	async function updateUserProfile(data, token) {
		try {
			const updatedUser = await api.updateProfile(data, token);
			setUser(updatedUser);

			return updatedUser;
		} catch (err) {
			console.error('Failed to update profile:', err.message);
		}
	}

	function logout() {
		clearToken();
		setToken(null);
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				loading,
				login,
				signup,
				logout,
				updateUserProfile,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}

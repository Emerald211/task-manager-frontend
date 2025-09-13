'use client';

import { useAuth } from '@/context/Authcontext';
import { useContext, useState } from 'react';

export default function UserForm() {
	const { user, token, updateUserProfile } = useAuth();

	const [name, setName] = useState('');

	console.log(user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let email = user?.email || '';
		try {
			const res = await updateUserProfile({ name, email }, token);

			console.log(res);
			alert('Profile updated successfully!');
		} catch (err) {
			alert('Failed to update profile: ' + err.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg space-y-5'>
			<h2 className='text-2xl font-bold text-white text-center'>
				Update Profile
			</h2>

			<input
				type='text'
				placeholder={user?.name || 'Your Name'}
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
			/>

			<button
				type='submit'
				className='w-full px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-md'>
				Save
			</button>
		</form>
	);
}

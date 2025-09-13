const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function request(endpoint, options = {}) {
	const res = await fetch(`${API_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
		...options,
	});

	if (!res.ok) {
		const text = await res.text();
		console.error('API Error:', res.status, res.statusText, text);
		throw new Error(text || 'API Error');
	}

	return res.json();
}

export const api = {
	login: (data) =>
		request('/api/v1/auth/signin', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	signup: (data) =>
		request('/api/v1/auth/signup', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	profile: (token) =>
		request('/api/v1/users/me', {
			headers: { Authorization: `Bearer ${token}` },
		}),
	updateProfile: (data, token) =>
		request(`/api/v1/users/me`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}),

	getTasks: (token) =>
		request('/api/v1/tasks', {
			headers: { Authorization: `Bearer ${token}` },
		}),

	getTask: (id, token) =>
		request(`/tasks/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		}),

	createTask: (data, token) =>
		request('/api/v1/tasks/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}),

	updateTask: (id, data, token) =>
		request(`/api/v1/tasks/edit/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}),

	deleteTask: (id, token) =>
		request(`/tasks/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		}),
};

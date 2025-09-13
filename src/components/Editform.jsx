'use client';

import { useTasks } from '@/context/Taskcontext';
import { useEffect, useState } from 'react';

export default function EditForm({ taskId }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [completed, setCompleted] = useState(false);

	const { tasks, updateTask } = useTasks();

	const task = tasks.find((t) => t._id === taskId);

	useEffect(() => {
		if (task) {
			setTitle(task.title || '');
			setDescription(task.description || '');
			setCompleted(task.completed || false);
		}
	}, [task]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await updateTask(taskId, { 
				title, 
				description, 
				completed 
			});

			console.log(res);
			alert(`Updated task ${taskId}: ${title}`);
		} catch (err) {
			console.error(err);
			alert('Failed to submit task: ' + err.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg space-y-5'>
			
			<h2 className='text-2xl font-bold text-white text-center'>
				Edit/Update Task
			</h2>

			<input
				type='text'
				placeholder='Task Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
			/>

			<input
				type='text'
				placeholder='Task Description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className='w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
			/>

			<div className="flex items-center gap-3 text-white">
				<input
					type="checkbox"
					checked={completed}
					onChange={(e) => setCompleted(e.target.checked)}
					className="w-4 h-4 accent-purple-600"
				/>
				<label>Mark as Completed</label>
			</div>

			<button
				type='submit'
				className='w-full px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-md'>
				Update Task
			</button>
		</form>
	);
}

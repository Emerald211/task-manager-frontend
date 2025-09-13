'use client';

import TaskCard from '@/components/Taskcard';
import { useTasks } from '@/context/Taskcontext';
import { useState } from 'react';

export default function TasksPage() {
	const { tasks, removeTask } = useTasks();
	const [filter, setFilter] = useState('all');

	const filteredTasks = tasks.filter((task) => {
		if (filter === 'all') return true;
		if (filter === 'completed') return task.completed === true;
		if (filter === 'pending') return task.completed === false;
		return true;
	});

	return (
		<section className='flex items-center justify-center min-h-screen bg-black px-6'>
			<div className='max-w-3xl w-full p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
					<h2 className='text-3xl font-bold text-white mb-4 md:mb-0'>
						Your Weekly Tasks
					</h2>

					<div className='flex gap-3'>
						{['all', 'pending', 'completed'].map((option) => (
							<button
								key={option}
								onClick={() => setFilter(option)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
									filter === option
										? 'bg-purple-600 text-white'
										: 'bg-white/10 border border-white/20 text-gray-300 hover:bg-purple-500/20'
								}`}>
								{option.charAt(0).toUpperCase() + option.slice(1)}
							</button>
						))}
					</div>
				</div>

				<div className='space-y-4'>
					{filteredTasks.length > 0 ? (
						filteredTasks.map((task) => (
							<TaskCard
								key={task._id}
								task={task}
								onDelete={() => removeTask(task._id)}
							/>
						))
					) : (
						<p className='text-gray-400 text-center py-6'>
							No tasks found for this filter.
						</p>
					)}
				</div>
			</div>
		</section>
	);
}

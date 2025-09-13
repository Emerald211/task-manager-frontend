'use client';

import { useRouter } from 'next/navigation';

export default function TaskCard({ task, onDelete }) {
	const router = useRouter();
	const deadlineMessage = (() => {
		if (!task.dueDate) return 'No due date';

		const now = new Date();
		const due = new Date(task.dueDate);

		const diffTime = due.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) return `⚠ Overdue by ${Math.abs(diffDays)} day(s)`;
		if (diffDays === 0) return '📌 Due today';
		if (diffDays === 1) return '📌 Due tomorrow';
		return ` Due in ${diffDays} days`;
	})();

	return (
		<div
			onClick={() => router.push(`/tasks/${task._id}`)}
			className='p-4 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-between'>
			<div>
				<h3 className='font-semibold text-lg'>{task.title}</h3>
				<p className='text-gray-300'>{task.description}</p>
				<p
					className={`text-sm ${
						task.completed ? 'text-green-400' : 'text-yellow-500'
					}`}>
					{task.completed ? ' Completed' : 'Pending'}
				</p>
				{!task.completed && (
					<p className='text-sm text-red-600'>{deadlineMessage}</p>
				)}
			</div>

			<button
				onClick={onDelete}
				className='ml-4 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-sm'>
				Delete
			</button>
		</div>
	);
}

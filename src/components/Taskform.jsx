'use client';

import { useTasks } from '@/context/Taskcontext';
import { useState } from 'react';

export default function TaskForm({ taskId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addTask({ title, description, dueDate });
      console.log(res);
    } catch (err) {
      console.error(err);
      alert('Failed to submit task: ' + err.message);
    }

    alert(
      taskId
        ? `Update task ${taskId}: ${title}, Due: ${dueDate}`
        : `Create task: ${title}, Due: ${dueDate}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        {taskId ? 'Update Task' : 'Add New Task'}
      </h2>

      {/* Task Title */}
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Task Description */}
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-md"
      >
        {taskId ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

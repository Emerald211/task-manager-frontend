"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "./Authcontext";


const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    api.getTasks(token).then((res) => {
      setTasks(res.data || []);
    });
  }, [token]);

  const addTask = async (taskData) => {
    const res = await api.createTask(taskData, token);
    setTasks((prev) => [...prev, res.data]);

    return res;
  };

  const updateTask = async (id, updatedData) => {
    const res = await api.updateTask(id, updatedData, token);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));

    return res;
  };

  const removeTask = async (id) => {
    await api.deleteTask(id, token);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

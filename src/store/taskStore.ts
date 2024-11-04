import { create } from 'zustand';
import { Property } from '../types';

export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed';
export type TaskPriority = 'urgent' | 'medium' | 'normal';

export interface Task {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  getTodaysTasks: () => Task[];
  getInProgressTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  addTask: (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  updateTaskStatus: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    }));
  },

  getTodaysTasks: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return get().tasks.filter(
      (task) => task.dueDate >= today && task.dueDate < tomorrow
    );
  },

  getInProgressTasks: () => {
    return get().tasks.filter((task) => task.status === 'in_progress');
  },
}));
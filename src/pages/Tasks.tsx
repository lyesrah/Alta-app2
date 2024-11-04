import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { usePropertyStore } from '../store/propertyStore';
import TaskList from '../components/tasks/TaskList';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import { ClipboardList, Plus } from 'lucide-react';

export default function Tasks() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const { tasks } = useTaskStore();
  const { properties } = usePropertyStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </button>
      </div>

      <TaskList tasks={tasks} properties={properties} />
      
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        properties={properties}
      />
    </div>
  );
}
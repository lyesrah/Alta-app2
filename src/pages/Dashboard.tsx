import React from 'react';
import { Building2, Users, ClipboardList, Clock, Bell, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { useClientStore } from '../store/clientStore';
import { useTaskStore } from '../store/taskStore';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
  path?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { properties } = usePropertyStore();
  const { getClientCount } = useClientStore();
  const { getTodaysTasks, getInProgressTasks } = useTaskStore();
  const { t } = useLanguageStore();

  const firstName = user?.email?.split('@')[0] || 'User';
  const tasks = getTodaysTasks();
  const inProgressTasks = getInProgressTasks();

  const stats: StatCard[] = [
    {
      title: t('dashboard.properties'),
      value: properties.length,
      icon: <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      path: '/properties'
    },
    {
      title: t('dashboard.totalClients'),
      value: getClientCount(),
      icon: <Users className="w-6 h-6 text-green-600 dark:text-green-400" />,
      path: '/clients'
    },
    {
      title: t('dashboard.todaysTasks'),
      value: tasks.length,
      icon: <ClipboardList className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      path: '/tasks'
    },
    {
      title: t('dashboard.tasksInProgress'),
      value: inProgressTasks.length,
      icon: <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      path: '/tasks'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.greeting')}, {firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
            <Mail className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => stat.path && navigate(stat.path)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">{stat.icon}</div>
              {stat.change && (
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dashboard.todaysTasks')}
            </h2>
            <button 
              onClick={() => navigate('/tasks')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {t('dashboard.viewAll')}
            </button>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-gray-900 dark:text-white">{task.description}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('dashboard.recentActivity')}
          </h2>
          <div className="space-y-6">
            {[
              { id: '1', message: 'New maintenance request from Apt 15A', time: '10 mins ago' },
              { id: '2', message: 'Lease signed by new tenant', time: '1 hour ago' },
              { id: '3', message: 'Rent payment received', time: '2 hours ago' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-gray-900 dark:text-white">{activity.message}</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MoreHorizontal } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

const data = [
  { name: 'Jan', value: 438 },
  { name: 'Feb', value: 883 },
  { name: 'Mar', value: 663 },
  { name: 'Apr', value: 272 },
  { name: 'May', value: 437 },
  { name: 'Jun', value: 101 }
];

const pieData = [
  { name: 'Hot Leads', value: 456, color: '#EF4444' },
  { name: 'Warm Leads', value: 360, color: '#F59E0B' },
  { name: 'Cold Leads', value: 72, color: '#3B82F6' },
  { name: 'Lost Leads', value: 2, color: '#6B7280' }
];

export default function LeadVisualization() {
  const { t } = useLanguageStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('leads.analytics.title')}
        </h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            {t('leads.analytics.monthlyLeads')}
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            {t('leads.analytics.distribution')}
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Calendar, Clock, Save, Trash2 } from 'lucide-react';

interface Planning {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

export default function EdicionPlannings() {
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const [newPlanning, setNewPlanning] = useState<Omit<Planning, 'id'>>({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const handleAddPlanning = () => {
    if (!newPlanning.title || !newPlanning.date || !newPlanning.time) return;
    
    setPlannings([
      ...plannings,
      {
        id: Date.now(),
        ...newPlanning
      }
    ]);
    
    setNewPlanning({
      title: '',
      date: '',
      time: '',
      description: ''
    });
  };

  const handleDeletePlanning = (id: number) => {
    setPlannings(plannings.filter(planning => planning.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edición de Plannings</h1>
        
        {/* Form for new planning */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Nuevo Planning</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={newPlanning.title}
                onChange={(e) => setNewPlanning({...newPlanning, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Título del planning"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={newPlanning.date}
                  onChange={(e) => setNewPlanning({...newPlanning, date: e.target.value})}
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Hora</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  value={newPlanning.time}
                  onChange={(e) => setNewPlanning({...newPlanning, time: e.target.value})}
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={newPlanning.description}
                onChange={(e) => setNewPlanning({...newPlanning, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Descripción del planning"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleAddPlanning}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Planning
            </button>
          </div>
        </div>

        {/* List of plannings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {plannings.map((planning) => (
              <li key={planning.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{planning.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {planning.date}
                      <Clock className="h-4 w-4 ml-4 mr-1" />
                      {planning.time}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{planning.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePlanning(planning.id)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
            {plannings.length === 0 && (
              <li className="p-6 text-center text-gray-500">
                No hay plannings creados
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
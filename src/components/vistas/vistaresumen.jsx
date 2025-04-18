import React from 'react';

const weekProgress = [
  { day: 'Lunes', percent: 0 },
  { day: 'Martes', percent: 100 },
  { day: 'Miércoles', percent: 100 },
  { day: 'Jueves', percent: 0 },
  { day: 'Viernes', percent: 0 },
  { day: 'Sábado', percent: 0 },
  { day: 'Domingo', percent: 0 },
];

const VistaResumen = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-1">Sesiones Totales</span>
          <span className="text-2xl font-bold text-blue-700">2</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-1">Días Activos</span>
          <span className="text-2xl font-bold text-green-600">2</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-1">Promedio Diario</span>
          <span className="text-2xl font-bold text-purple-500">0.3</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-1">Completado</span>
          <span className="text-2xl font-bold text-orange-500">29%</span>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="font-semibold text-lg text-blue-700 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Progreso General - Semana 1
        </h3>
        <div>
          {weekProgress.map((item, idx) => (
            <div key={item.day} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{item.day}</span>
                <span className="text-gray-500">{item.percent}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${item.percent > 0 ? 'bg-blue-600' : ''}`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white rounded-xl shadow p-6">
        <h4 className="font-semibold text-md text-gray-700 mb-4">Estadísticas Detalladas</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[120px] bg-gray-50 rounded-lg p-4">
            <span className="block text-gray-500 text-sm mb-1">Intensidad</span>
            <span className="text-xl font-bold text-blue-700">-</span>
          </div>
          <div className="flex-1 min-w-[120px] bg-gray-50 rounded-lg p-4">
            <span className="block text-gray-500 text-sm mb-1">Duración</span>
            <span className="text-xl font-bold text-blue-700">-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaResumen;
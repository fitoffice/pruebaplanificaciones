import React from 'react';
import { CalendarDays, Dumbbell, Layers3, Clock, ChevronRight, CalendarX2 } from 'lucide-react'; // Example icons

// Placeholder data structure (replace with actual data passed via props)
const sampleDaysData = [
  {
    dayName: 'Lunes',
    sessions: [], // No sessions for Monday
  },
  {
    dayName: 'Martes',
    sessions: [
      {
        id: 's1',
        title: 'Rutina de Pecho',
        subtitle: 'Sesión de entrenamiento',
        durationMinutes: 2, // Example duration
        exercises: [
          { id: 'e1', name: 'Press Inclinado', summary: '2 x 12', weight: '20kg' },
          { id: 'e2', name: 'Press Mancuerna Inclinado', summary: '1 x 12', weight: '20kg' },
        ],
        // These could be calculated or passed in
        totalExercises: 2,
        totalSets: 3, // Sum of sets across all exercises (2+1)
      },
      // Add more sessions for Tuesday if needed
    ],
  },
  // Add more days as needed
];

// Helper component for a single session card
const SessionCard = ({ session }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer">
    {/* Session Header */}
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="text-md font-semibold text-gray-800">{session.title}</h4>
        <p className="text-xs text-gray-500">{session.subtitle}</p>
      </div>
      <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
        <Clock size={14} className="text-blue-500" />
        <span>{session.durationMinutes} min</span>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>

    {/* Session Stats */}
    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
      <div className="bg-purple-50 text-purple-700 p-2 rounded-md text-xs">
        <Dumbbell size={16} className="mx-auto mb-1" />
        <span className="font-medium">{session.totalExercises}</span> Ejercicios
      </div>
      <div className="bg-blue-50 text-blue-700 p-2 rounded-md text-xs">
        <Layers3 size={16} className="mx-auto mb-1" />
        <span className="font-medium">{session.totalSets}</span> Series
      </div>
      <div className="bg-green-50 text-green-700 p-2 rounded-md text-xs">
        <Clock size={16} className="mx-auto mb-1" />
        <span className="font-medium">{session.durationMinutes}</span> Minutos
      </div>
    </div>

    {/* Exercise List */}
    <div>
      {session.exercises.map((exercise, index) => (
        <div key={exercise.id} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center">
            <span className="text-xs bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center mr-3">{index + 1}</span>
            <span className="text-gray-700">{exercise.name}</span>
          </div>
          <div className="flex space-x-3">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{exercise.summary}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{exercise.weight}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Component
const VistaSimple = ({ daysData = sampleDaysData }) => { // Use sample data as default
  return (
    <div className="space-y-6 p-4 md:p-6">
      {daysData.map((day, index) => (
        <div key={index} className={`rounded-lg p-4 ${index % 2 === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
          {/* Day Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <CalendarDays size={18} className="mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">{day.dayName}</h3>
            </div>
            <span className="text-xs text-gray-500">{day.sessions.length} sesiones programadas</span>
            {/* Optional: Add other icons like the yellow warning icon if needed */}
          </div>

          {/* Sessions or Placeholder */}
          {day.sessions.length > 0 ? (
            <div>
              {day.sessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-white rounded-lg border border-dashed border-gray-300">
              <CalendarX2 size={32} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">No hay sesiones programadas</p>
              <p className="text-xs text-gray-400 mt-1">Añade una sesión para comenzar tu planificación</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VistaSimple;
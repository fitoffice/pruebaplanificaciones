import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Repeat, Weight, Clock, Zap, Dumbbell } from 'lucide-react'; // Example icons

// Placeholder data structure (replace with actual data passed via props)
const sampleWeekData = {
  weekName: 'Semana 1',
  days: [
    {
      dayName: 'Lunes',
      sessionsCount: 0,
      routines: [],
    },
    {
      dayName: 'Martes',
      sessionsCount: 1,
      routines: [
        {
          id: 'r1',
          name: 'Rutina de Pecho',
          tag: 'Normal',
          exercises: [
            {
              id: 'ex1',
              name: 'Press Inclinado', // Name not explicitly shown in image, but needed for structure
              icon: Dumbbell, // Placeholder icon for exercise
              sets: [
                { id: 's1a', reps: 12, weight: 20, rest: 24, tempo: '2-1-2-1' },
                { id: 's1b', reps: 12, weight: 10, rest: 60, tempo: '2-0-2-0' },
              ],
            },
            {
              id: 'ex2',
              name: 'Press Mancuerna Inclinado', // Name not explicitly shown
              icon: Dumbbell, // Placeholder icon
              sets: [
                { id: 's2a', reps: 12, weight: 20, rest: 23, tempo: '2-1-2-1' },
              ],
            },
          ],
        },
      ],
    },
    { dayName: 'Miércoles', sessionsCount: 1, routines: [] }, // Add routine data if needed
    { dayName: 'Jueves', sessionsCount: 0, routines: [] },
    { dayName: 'Viernes', sessionsCount: 0, routines: [] },
    { dayName: 'Sábado', sessionsCount: 0, routines: [] },
    { dayName: 'Domingo', sessionsCount: 0, routines: [] },
  ],
};

// Component for rendering a single set's details
const SetDetail = ({ set, index }) => (
  <div className="flex flex-wrap items-center space-x-4 text-xs text-gray-600 py-1">
    <span className="font-medium w-10">Set {index + 1}:</span>
    <span className="flex items-center"><Repeat size={12} className="mr-1 text-blue-500" /> {set.reps} reps</span>
    <span className="flex items-center"><Weight size={12} className="mr-1 text-green-500" /> {set.weight} kg</span>
    <span className="flex items-center"><Clock size={12} className="mr-1 text-orange-500" /> {set.rest}s</span>
    <span className="flex items-center"><Zap size={12} className="mr-1 text-purple-500" /> Tempo: {set.tempo}</span>
  </div>
);

// Component for rendering a single day's accordion item
const DayAccordionItem = ({ day, isInitiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
      >
        <div>
          <span className="font-semibold text-gray-800">{day.dayName}</span>
          <span className="text-xs text-gray-500 ml-2">{day.sessionsCount} sesiones</span>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          {day.routines.length > 0 ? (
            day.routines.map(routine => (
              <div key={routine.id} className="mb-4 last:mb-0">
                {/* Routine Header */}
                <div className="flex items-center mb-2">
                  <h4 className="text-md font-semibold text-gray-700 mr-2">{routine.name}</h4>
                  {routine.tag && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{routine.tag}</span>
                  )}
                </div>
                {/* Exercises */}
                {routine.exercises.map(exercise => (
                  <div key={exercise.id} className="bg-gray-50 rounded p-3 mb-3 border border-gray-100">
                    {/* Exercise Header (Optional - could add exercise.name here) */}
                     <div className="flex items-center mb-2">
                       {exercise.icon && <exercise.icon size={16} className="mr-2 text-blue-600" />}
                       {/* <span className="text-sm font-medium">{exercise.name}</span> */}
                     </div>
                    {/* Sets */}
                    {exercise.sets.map((set, index) => (
                      <SetDetail key={set.id} set={set} index={index} />
                    ))}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No hay ejercicios programados para este día.</p>
          )}
        </div>
      )}
    </div>
  );
};


// Main Component
const VistaEjercicios = ({ weekData = sampleWeekData }) => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-center mb-6 text-blue-700">
        Ejercicios Detallados - {weekData.weekName}
      </h1>
      <div className="space-y-2 max-w-4xl mx-auto">
        {weekData.days.map((day, index) => (
          <DayAccordionItem
            key={day.dayName}
            day={day}
            // Automatically open the first day with sessions
            isInitiallyOpen={index === weekData.days.findIndex(d => d.sessionsCount > 0)}
          />
        ))}
      </div>
    </div>
  );
};

export default VistaEjercicios;
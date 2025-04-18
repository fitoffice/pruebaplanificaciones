import React, { useState } from 'react';
import { Grid3X3, Plus, X, ChevronDown, Command, GitBranch, PlusCircle, Trash2 } from 'lucide-react'; // Example icons

// Placeholder data (replace with actual props/state)
const sampleDays = [
  { name: 'Lunes', sessions: 0 },
  { name: 'Martes', sessions: 1 },
  { name: 'Miércoles', sessions: 1 },
  { name: 'Jueves', sessions: 0 },
  { name: 'Viernes', sessions: 0 },
  { name: 'Sábado', sessions: 0 },
  { name: 'Domingo', sessions: 0 },
];

const sampleRoutine = {
  exercises: [
    {
      id: 'ex1',
      name: 'Press Inclinado',
      sets: [
        { id: 's1a', reps: 12, weight: 20, rest: 23 },
        { id: 's1b', reps: 12, weight: 10, rest: 60 },
      ],
      notes: '',
    },
    {
      id: 'ex2',
      name: 'Press Mancuerna Inclinado',
      sets: [
        { id: 's2a', reps: 12, weight: 20, rest: 23 },
      ],
      notes: '',
    },
  ],
};

// Simple Toggle Switch Component (can be moved to its own file)
const ToggleSwitch = ({ labelLeft, labelRight, enabled, setEnabled }) => (
  <div className="flex items-center space-x-2">
    <span className={`text-xs ${!enabled ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{labelLeft}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
    <span className={`text-xs ${enabled ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{labelRight}</span>
  </div>
);


const VistaExcel = () => {
  const [selectedDay, setSelectedDay] = useState('Martes'); // Default selected day
  const [routineData, setRoutineData] = useState(sampleRoutine); // Manage routine data
  const [useSameCategories, setUseSameCategories] = useState(false);

  // Handlers (placeholders - implement actual logic)
  const handleAddExercise = () => console.log('Add Exercise');
  const handleAddSet = (exerciseId) => console.log('Add Set to', exerciseId);
  const handleDeleteSet = (exerciseId, setId) => console.log('Delete Set', setId, 'from', exerciseId);
  const handleSaveChanges = () => console.log('Save Changes');
  const handleShowShortcuts = () => console.log('Show Shortcuts');

  return (
    <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Grid3X3 size={20} className="mr-2 text-blue-600" /> Vista Excel
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddExercise}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-sm font-medium py-1.5 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
          >
            <Plus size={16} className="mr-1" /> Añadir Ejercicio
          </button>
          <button
            onClick={handleShowShortcuts}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
          >
            <Command size={16} className="mr-1" /> Atajos
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-medium py-1.5 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
          >
            <GitBranch size={16} className="mr-1" /> Sin Cambios
          </button>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {sampleDays.map(day => (
          <button
            key={day.name}
            onClick={() => setSelectedDay(day.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm focus:outline-none ${selectedDay === day.name ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
          >
            <div className="font-medium">{day.name}</div>
            <div className="text-xs opacity-80">{day.sessions} sesiones</div>
          </button>
        ))}
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-lg shadow p-4">
        {/* Table Header Row */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 items-center border-b border-gray-200 pb-2 mb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div>Ejercicio</div>
          <div className="text-center">Series</div>
          <div className="flex items-center justify-center">Repeticiones <ChevronDown size={14} className="ml-1" /></div>
          <div className="flex items-center justify-center">Peso <ChevronDown size={14} className="ml-1" /></div>
          <div className="flex items-center justify-center">Descanso <ChevronDown size={14} className="ml-1" /></div>
          <div className="flex justify-between items-center">
            <span>Notas</span>
            <ToggleSwitch
              labelLeft="Categorías individuales"
              labelRight="Mismas categorías"
              enabled={useSameCategories}
              setEnabled={setUseSameCategories}
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-1">
          {routineData.exercises.map((exercise) => (
            <React.Fragment key={exercise.id}>
              {/* Exercise Row */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 items-center py-2 border-b border-gray-100">
                <div className="font-medium text-sm text-gray-800">{exercise.name}</div>
                <div className="text-center">
                  <button onClick={() => handleAddSet(exercise.id)} className="text-blue-500 hover:text-blue-700">
                    <PlusCircle size={18} />
                  </button>
                </div>
                {/* Placeholder columns for exercise row */}
                <div></div>
                <div></div>
                <div></div>
                <div>{/* Notes input could go here */}</div>
              </div>

              {/* Sets Rows */}
              {exercise.sets.map((set, index) => (
                <div key={set.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 items-center py-1.5 text-sm text-gray-600 pl-4 border-b border-gray-100 last:border-b-0">
                  <div>{/* Empty cell under Exercise */}</div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>Serie {index + 1}</span>
                    <button onClick={() => handleDeleteSet(exercise.id, set.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="text-center">{set.reps} reps</div>
                  <div className="text-center">{set.weight} kg</div>
                  <div className="text-center">{set.rest} seg</div>
                  <div>{/* Notes for set? */}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer (Optional) */}
      <div className="text-xs text-gray-400 mt-2">
        {routineData.exercises.length} Filas - 6 columnas
      </div>
    </div>
  );
};

export default VistaExcel;
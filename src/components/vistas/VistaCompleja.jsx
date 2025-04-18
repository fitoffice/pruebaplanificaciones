import React, { useState, useEffect } from 'react';
// Removed Ant Design imports
// import { Button, Card, Select, InputNumber, Row, Col, Typography, Space, Dropdown, Menu } from 'antd';
// import { CalendarOutlined, PlusOutlined, EditOutlined, CopyOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import { Save } from 'lucide-react'; // Import the Save icon

// Placeholder icons (or use a library like Heroicons)
const CalendarIcon = () => <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PlusIcon = () => <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const EditIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const CopyIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const DeleteIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

import PopupCrearSesion from './PopupCrearSesion';
import PopupAnadirRutina from './PopupAnadirRutina';
import PopupAnadirEjercicio from './PopupAnadirEjercicio'; // Import the new popup component

// Removed exerciseMenu prop as AntD Dropdown/Menu is removed
// Make sure to destructure onAddSet from props
const VistaCompleja = ({ routine, onAddSet }) => {
  // State for popups
  const [isCreateSessionPopupOpen, setIsCreateSessionPopupOpen] = useState(false);
  const [isAddRoutinePopupOpen, setIsAddRoutinePopupOpen] = useState(false);
  const [isAddExercisePopupOpen, setIsAddExercisePopupOpen] = useState(false); // State for Add Exercise popup

  // State for editing routine name
  const [isEditingRoutineName, setIsEditingRoutineName] = useState(false);
  const [currentRoutineName, setCurrentRoutineName] = useState('');

  // Effect to update local routine name state when the routine prop changes
  useEffect(() => {
    if (routine) {
      setCurrentRoutineName(routine.name);
      setIsEditingRoutineName(false); // Reset editing state if routine changes
    }
  }, [routine]); // Dependency array includes routine

  if (!routine) {
    // Styled placeholder with Tailwind
    return <div className="bg-white rounded-lg shadow p-4 text-gray-500">Selecciona un día para ver la rutina.</div>;
  }

  // Handlers for "Crear Sesion" popup
  const handleOpenCreateSessionPopup = () => setIsCreateSessionPopupOpen(true);
  const handleCloseCreateSessionPopup = () => setIsCreateSessionPopupOpen(false);

  // Handlers for "Añadir Rutina" popup
  const handleOpenAddRoutinePopup = () => setIsAddRoutinePopupOpen(true);
  const handleCloseAddRoutinePopup = () => setIsAddRoutinePopupOpen(false);

  // Handlers for "Añadir Ejercicio" popup
  const handleOpenAddExercisePopup = () => setIsAddExercisePopupOpen(true);
  const handleCloseAddExercisePopup = () => setIsAddExercisePopupOpen(false);
  const handleRoutineNameChange = (event) => {
    setCurrentRoutineName(event.target.value);
  };

  const toggleEditRoutineName = () => {
    if (isEditingRoutineName) {
      // Add logic here to save the currentRoutineName if needed
      // For example, call a prop function: onUpdateRoutineName(routine.id, currentRoutineName);
      console.log("Saving routine name:", currentRoutineName);
    }
    setIsEditingRoutineName(!isEditingRoutineName);
  };
  const handleRoutineNameKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleEditRoutineName(); // Save and exit edit mode
    }
  };


  // Handler for adding a new set to an exercise
  const handleAddSet = (exerciseId) => {
    // In a real app, generate a unique ID for the new set
    const newSet = {
      id: `new-set-${Date.now()}`, // Example temporary ID - consider a more robust UUID solution
      reps: 8, // Default reps
      weight: 0, // Default weight
      rest: 60, // Default rest
    };
    // console.log(`Adding set to exercise ${exerciseId}:`, newSet); // Keep for debugging if needed
    // Call the prop function passed from the parent to update the state:
    if (onAddSet) { // Check if the prop function exists
      onAddSet(exerciseId, newSet);
    } else {
      console.error("onAddSet prop is not defined!");
    }
  };


  return (
    // Replaced className="workout-details" with Tailwind margin/padding if needed, assuming parent handles spacing
    <div className="mt-4">
      {/* Replaced routine-header-controls with Flexbox */}
      <div className="flex justify-between items-center mb-4 px-1">
        {/* Replaced Title with h4 and Tailwind classes */}
        <h4 className="text-xl font-semibold text-gray-800 flex items-center">
          <CalendarIcon /> {routine.day}
        </h4>
        {/* Replaced Space with div and Tailwind classes */}
        <div className="flex space-x-2">
          {/* Add onClick handler to the button */}
          <button
            onClick={handleOpenCreateSessionPopup} // Use specific handler
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Crear Sesion
          </button>
          {/* Añadir Rutina Button */}
          <button
            onClick={handleOpenAddRoutinePopup} // Use specific handler
            className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            + Añadir Rutina
          </button>
        </div>
      </div>

      {/* Replaced AntD Card with div and Tailwind classes */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        {/* Replaced routine-title-bar with Flexbox */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        {/* Routine Title Bar */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          {/* Conditionally render input or text */}
          {isEditingRoutineName ? (
            <input
              type="text"
              value={currentRoutineName}
              onChange={handleRoutineNameChange}
              onKeyDown={handleRoutineNameKeyDown} // Handle Enter key
              onBlur={toggleEditRoutineName} // Optional: save/exit on blur
              className="text-lg font-semibold text-gray-700 border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus // Focus the input when it appears
            />
          ) : (
            <h5 className="text-lg font-semibold text-gray-700">{currentRoutineName}</h5>
          )}
          {/* Buttons container */}
          <div className="flex items-center space-x-1">
             {/* Edit/Copy buttons */}
             <button
                onClick={toggleEditRoutineName} // Toggle edit mode on click
                className={`p-1 rounded ${isEditingRoutineName ? 'text-blue-600 bg-blue-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
             >
                <EditIcon />
             </button>
             <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
             <Save size={16} /> {/* Use Lucide Save icon */}
             </button>
             {/* Add Exercise Button */}
             <button
                onClick={handleOpenAddExercisePopup}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
             >
                <PlusIcon /> <span className="ml-1">Añadir Ejercicio</span>
             </button>
          </div>
        </div>
        </div>


        {/* Map over exercises */}
        {routine.exercises.map(exercise => (
          // Replaced AntD Card with div and Tailwind classes
          <div key={exercise.id} className="bg-gray-50 rounded-md p-4 mb-4 border border-gray-200">
            {/* Replaced exercise-header with Flexbox */}
            <div className="flex justify-between items-center mb-3">
              {/* Replaced Text strong with span and Tailwind classes */}
              <span className="font-semibold text-gray-800">{exercise.name}</span>
              {/* Removed Dropdown, added simple Delete button */}
              <button className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded">
                 <DeleteIcon />
              </button>
            </div>
            {/* Map over sets */}
            {exercise.sets.map((set, index) => (
              // Replaced Row/Col with Flexbox for layout
              <div key={set.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 p-2 bg-white rounded border border-gray-100">
                 {/* Set Label */}
                 <span className="text-sm font-medium text-gray-600 w-12">Set {index + 1}</span>
                 {/* Reps Input Group */}
                 <div className="flex items-center space-x-2 flex-1 min-w-[180px]">
                    <label htmlFor={`reps-type-${set.id}`} className="sr-only">Tipo Reps</label>
                    <select id={`reps-type-${set.id}`} defaultValue="Repeticiones" className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option value="Repeticiones">Repeticiones</option>
                    </select>
                    <label htmlFor={`reps-value-${set.id}`} className="sr-only">Valor Reps</label>
                    <input
                      id={`reps-value-${set.id}`}
                      type="number"
                      min="1"
                      defaultValue={set.reps}
                      className="text-xs border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                 </div>
                 {/* Weight Input Group */}
                 <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
                    <label htmlFor={`weight-type-${set.id}`} className="sr-only">Tipo Peso</label>
                    <select id={`weight-type-${set.id}`} defaultValue="Peso" className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option value="Peso">Peso</option>
                    </select>
                    <label htmlFor={`weight-value-${set.id}`} className="sr-only">Valor Peso</label>
                    <input
                      id={`weight-value-${set.id}`}
                      type="number"
                      min="0"
                      defaultValue={set.weight}
                      className="text-xs border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                 </div>
                 {/* Rest Input Group */}
                 <div className="flex items-center space-x-2 flex-1 min-w-[160px]">
                    <label htmlFor={`rest-type-${set.id}`} className="sr-only">Tipo Descanso</label>
                    <select id={`rest-type-${set.id}`} defaultValue="Descanso" className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option value="Descanso">Descanso</option>
                    </select>
                    <label htmlFor={`rest-value-${set.id}`} className="sr-only">Valor Descanso</label>
                    <input
                      id={`rest-value-${set.id}`}
                      type="number"
                      min="0"
                      defaultValue={set.rest}
                      className="text-xs border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                 </div>
              </div>
            ))}
            {/* Replaced dashed Button with HTML button and Tailwind classes */}
            <button
              onClick={() => handleAddSet(exercise.id)} // Call handleAddSet with the exercise ID
              className="mt-2 w-full border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600 text-sm font-medium py-1 px-3 rounded-md transition duration-150 ease-in-out flex items-center justify-center"
            >
              <PlusIcon /> <span className="ml-1">Añadir Set</span>
            </button>
          </div>
        ))}
      </div>
      <PopupCrearSesion isOpen={isCreateSessionPopupOpen} onClose={handleCloseCreateSessionPopup} />
      <PopupAnadirRutina isOpen={isAddRoutinePopupOpen} onClose={handleCloseAddRoutinePopup} />
      {/* Pass routine name to the Add Exercise popup */}
      <PopupAnadirEjercicio
        isOpen={isAddExercisePopupOpen}
        onClose={handleCloseAddExercisePopup}
        routineName={currentRoutineName} // Pass potentially updated name
      />
    </div>
  );
};

export default VistaCompleja;
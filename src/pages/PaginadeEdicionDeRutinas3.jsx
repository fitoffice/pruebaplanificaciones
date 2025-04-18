import React, { useState } from 'react';
// Ant Design imports - Add back imports needed by VistasSimplificadas and VistaCompleja
import { Select, Typography, Card, Row, Col, Button, Avatar, Space } from 'antd'; // Added Card, Row, Col, Button, Avatar, Space
// Removed unused icons
import './paginadeedicionderutinas.css';
import WorkoutCalendarHeader from '../components/WorkoutCalendarHeader';
// Removed VistasNavegacion import

// Re-import VistaCompleja
// import VistaCompleja from '../components/vistas/VistaCompleja'; // Removed original import
import VistaCompleja2 from '../components/vistas/vistacompleja2'; // Import VistaCompleja2
// Removed imports for other individual view components
// import VistaSimple from '../components/vistas/VistaSimple';
import VistaExcel from '../components/vistas/VistaExcel';
import VistaEjercicios from '../components/vistas/VistaEjercicios';
import VistaRutinas from '../components/vistas/vistarutinas'; // Corrected import path if needed
import VistaFormulas from '../components/vistas/vistaformulas'; // Corrected import path if needed
import VistaRMS from '../components/vistas/vistarms';         // Corrected import path if needed
import VistaNotas from '../components/vistas/vistanotas';     // Corrected import path if needed
import VistaResumen from '../components/vistas/vistaresumen'; // Corrected import path if needed
import VistasSimplificadas from '../components/VistasSimplificadas';


const { Title, Text } = Typography; // Keep if needed by WorkoutCalendarHeader
const { Option } = Select; // Keep if needed by WorkoutCalendarHeader

// Sample data for WorkoutCalendarHeader (remains the same)
const allWeeksData = [
    {
      id: 0, // Use index as ID for simplicity
      name: 'Semana 1',
      dates: '12/04/2025 - 18/04/2025',
      days: [
        { id: 'w0d1', name: 'Tuesday', date: 14, workout: 'Pecho Week 1' },
        { id: 'w0d2', name: 'Wednesday', date: 15, workout: 'Pierna Week 1' },
        { id: 'w0d3', name: 'Thursday', date: 16, workout: null },
        { id: 'w0d4', name: 'Friday', date: 17, workout: null },
        { id: 'w0d5', name: 'Saturday', date: 18, workout: null },
        { id: 'w0d6', name: 'Sunday', date: 19, workout: null },
        { id: 'w0d7', name: 'Monday', date: 20, workout: null },
      ]
    },
    {
      id: 1,
      name: 'Semana 2',
      dates: '19/04/2025 - 25/04/2025',
      days: [
        { id: 'w1d1', name: 'Tuesday', date: 21, workout: null },
        { id: 'w1d2', name: 'Wednesday', date: 22, workout: 'Espalda Week 2' },
        { id: 'w1d3', name: 'Thursday', date: 23, workout: null },
        { id: 'w1d4', name: 'Friday', date: 24, workout: 'Biceps Week 2' },
        { id: 'w1d5', name: 'Saturday', date: 25, workout: null },
        { id: 'w1d6', name: 'Sunday', date: 26, workout: null },
        { id: 'w1d7', name: 'Monday', date: 27, workout: null },
      ]
    },
    {
      id: 2, name: 'Semana 3', dates: '26/04/2025 - 02/05/2025', days: [ /* ... days for week 3 ... */ ]
    },
    {
      id: 3, name: 'Semana 4', dates: '03/05/2025 - 09/05/2025', days: [ /* ... days for week 4 ... */ ]
    },
];
const weeksForHeader = allWeeksData.map(({ id, name, dates }) => ({ id, name, dates }));

// Reintroduce initialRoutineData or fetch dynamically
const initialRoutineData = {
  day: 'Lunes', // This might need to be dynamic based on selectedDayId
  name: 'Rutina de Pecho',
  exercises: [
    {
      id: 1,
      name: 'Press Inclinado',
      sets: [
        { id: 1, reps: 12, weight: 20, rest: 23 },
        { id: 2, reps: 12, weight: 10, rest: 60 },
      ]
    },
    {
      id: 2,
      name: 'Press Mancuerna Inclinado',
      sets: []
    }
  ]
};


// Renamed component to match the new filename (optional but good practice)
const PaginadeEdicionDeRutinas3 = () => {
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedDayId, setSelectedDayId] = useState(null);
    // Reintroduce state for the routine data needed by VistaCompleja
    const [currentRoutine, setCurrentRoutine] = useState(initialRoutineData);
    // Removed activeView state as we are only showing VistaCompleja now
    // const [activeView, setActiveView] = useState('VistaCompleja');

    const handleWeekChange = (direction) => {
        let newIndex = currentWeekIndex;
        if (direction === 'prev' && currentWeekIndex > 0) {
          newIndex = currentWeekIndex - 1;
        } else if (direction === 'next' && currentWeekIndex < allWeeksData.length - 1) {
          newIndex = currentWeekIndex + 1;
        }
        setCurrentWeekIndex(newIndex);
        setSelectedDayId(null);
        // Reset or load routine based on the new week/day if necessary
        setCurrentRoutine(initialRoutineData); // Resetting to initial for now
      };

      const handleSelectDay = (dayId) => {
        setSelectedDayId(dayId);
        console.log("Selected Day ID:", dayId);
        // Find the day's data and update the current routine
        const dayData = allWeeksData[currentWeekIndex]?.days.find(d => d.id === dayId);
        if (dayData) {
            // Example: Update routine based on selected day
            // You might fetch specific routine data here instead of using initial data
            setCurrentRoutine(prev => ({
                ...prev, // Keep exercises structure for now, replace if needed
                day: dayData.name, // Update the day name
                name: dayData.workout || `Rutina para ${dayData.name}` // Update routine name
                // Potentially load exercises specific to this day here
            }));
        } else {
             // Handle case where day data isn't found, reset to default
             setCurrentRoutine(initialRoutineData);
        }
      };

      // Get the days for the currently selected week
      const currentDays = allWeeksData[currentWeekIndex]?.days || [];

    // Reintroduce handler function to add a set, needed by VistaCompleja
    const handleAddSetToRoutine = (exerciseId, newSet) => {
      setCurrentRoutine(prevRoutine => {
        // Create a deep copy to avoid direct state mutation
        const updatedRoutine = JSON.parse(JSON.stringify(prevRoutine));
        const exerciseIndex = updatedRoutine.exercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex !== -1) {
          updatedRoutine.exercises[exerciseIndex].sets.push(newSet);
        } else {
          console.warn(`Exercise with ID ${exerciseId} not found.`);
        }
        return updatedRoutine;
      });
    };

    // Removed handleSelectView and renderActiveView as they are no longer needed
    // const handleSelectView = (...) => { ... };
    // const renderActiveView = () => { ... };


  return (
    <div className="routine-editor-container p-4 md:p-6"> {/* Added padding */}
      {/* Header remains the same */}
      <WorkoutCalendarHeader
        weeks={weeksForHeader}
        currentWeek={currentWeekIndex}
        handleWeekChange={handleWeekChange}
        setCurrentWeek={setCurrentWeekIndex}
        days={currentDays}
        selectedDayId={selectedDayId}
        handleSelectDay={handleSelectDay}
      />

      {/* Removed Navigation Tabs */}

      {/* Render VistasSimplificadas first */}
      <div className="mt-6"> {/* Add margin top for separation */}
        <VistasSimplificadas />
      </div>

      {/* Render VistaCompleja2 below VistasSimplificadas */}
      <div className="mt-6"> {/* Add margin top for separation */}
        {/* Changed component from VistaCompleja to VistaCompleja2 */}
        <VistaCompleja2 routine={currentRoutine} onAddSet={handleAddSetToRoutine} />
      </div>

    </div>
  );
};

// Renamed export to match the new component name
export default PaginadeEdicionDeRutinas3;
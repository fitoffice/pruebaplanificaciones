import React, { useState } from 'react';
// Ant Design imports are kept if WorkoutCalendarHeader still uses them, otherwise remove
import { Button, Card, Select, InputNumber, DatePicker, Row, Col, Typography, Space, Dropdown, Menu } from 'antd';
import { LeftOutlined, RightOutlined, CalendarOutlined, PlusOutlined, EditOutlined, CopyOutlined, MoreOutlined, DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import './paginadeedicionderutinas.css';
import WorkoutCalendarHeader from '../components/WorkoutCalendarHeader';
import VistasNavegacion from '../components/vistasnavegacion';

// Import all the view components
import VistaCompleja from '../components/vistas/VistaCompleja';
import VistaSimple from '../components/vistas/VistaSimple';
import VistaExcel from '../components/vistas/VistaExcel';
import VistaEjercicios from '../components/vistas/VistaEjercicios';
import VistaRutinas from '../components/vistas/vistarutinas'; // Corrected import path if needed
import VistaFormulas from '../components/vistas/vistaformulas'; // Corrected import path if needed
import VistaRMS from '../components/vistas/vistarms';         // Corrected import path if needed
import VistaNotas from '../components/vistas/vistanotas';     // Corrected import path if needed
import VistaResumen from '../components/vistas/vistaresumen'; // Corrected import path if needed


const { Title, Text } = Typography; // Keep if needed by WorkoutCalendarHeader
const { Option } = Select; // Keep if needed by WorkoutCalendarHeader

// Sample data (replace with actual state management)
const allWeeksData = [
    {
      id: 0, // Use index as ID for simplicity
      name: 'Week 1', // Changed from 'Semana 1'
      dates: '12/04/2025 - 18/04/2025',
      days: [
        { id: 'w0d1', name: 'Tuesday', date: 14, workout: 'Chest Week 1' }, // Changed from 'Pecho Week 1'
        { id: 'w0d2', name: 'Wednesday', date: 15, workout: 'Leg Week 1' }, // Changed from 'Pierna Week 1'
        { id: 'w0d3', name: 'Thursday', date: 16, workout: null },
        { id: 'w0d4', name: 'Friday', date: 17, workout: null },
        { id: 'w0d5', name: 'Saturday', date: 18, workout: null },
        { id: 'w0d6', name: 'Sunday', date: 19, workout: null },
        { id: 'w0d7', name: 'Monday', date: 20, workout: null },
      ]
    },
    {
      id: 1,
      name: 'Week 2', // Changed from 'Semana 2'
      dates: '19/04/2025 - 25/04/2025',
      days: [
        { id: 'w1d1', name: 'Tuesday', date: 21, workout: null },
        { id: 'w1d2', name: 'Wednesday', date: 22, workout: 'Back Week 2' }, // Changed from 'Espalda Week 2'
        { id: 'w1d3', name: 'Thursday', date: 23, workout: null },
        { id: 'w1d4', name: 'Friday', date: 24, workout: 'Biceps Week 2' },
        { id: 'w1d5', name: 'Saturday', date: 25, workout: null },
        { id: 'w1d6', name: 'Sunday', date: 26, workout: null },
        { id: 'w1d7', name: 'Monday', date: 27, workout: null },
      ]
    },
    // Add data for Semana 3 and Semana 4 similarly
    {
      id: 2, name: 'Week 3', dates: '26/04/2025 - 02/05/2025', days: [ /* ... days for week 3 ... */ ] // Changed from 'Semana 3'
    },
    {
      id: 3, name: 'Week 4', dates: '03/05/2025 - 09/05/2025', days: [ /* ... days for week 4 ... */ ] // Changed from 'Semana 4'
    },
  ];
  const weeksForHeader = allWeeksData.map(({ id, name, dates }) => ({ id, name, dates }));

// Initial routine data (can be loaded from API, etc.)
// This data is primarily for VistaCompleja
const initialRoutineData = {
  day: 'Monday', // Changed from 'Lunes'
  name: 'Chest Routine', // Changed from 'Rutina de Pecho'
  exercises: [
    {
      id: 1,
      name: 'Incline Press', // Changed from 'Press Inclinado'
      sets: [
        { id: 1, reps: 12, weight: 20, rest: 23 },
        { id: 2, reps: 12, weight: 10, rest: 60 },
      ]
    },
    {
      id: 2,
      name: 'Incline Dumbbell Press', // Changed from 'Press Mancuerna Inclinado'
      sets: []
    }
  ]
};

const PaginadeEdicionDeRutinas = () => {
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedDayId, setSelectedDayId] = useState(null);
    // Manage the routine data with state (primarily for VistaCompleja)
    const [currentRoutine, setCurrentRoutine] = useState(initialRoutineData);
    // State to manage the active view component
    const [activeView, setActiveView] = useState('VistaCompleja'); // Default view

    const handleWeekChange = (direction) => {
        let newIndex = currentWeekIndex;
        if (direction === 'prev' && currentWeekIndex > 0) {
          newIndex = currentWeekIndex - 1;
        } else if (direction === 'next' && currentWeekIndex < allWeeksData.length - 1) {
          newIndex = currentWeekIndex + 1;
        }
        setCurrentWeekIndex(newIndex);
        // Reset selected day when week changes
        setSelectedDayId(null);
        // Potentially reset or load new routine data based on the new week/day
        // For now, we keep the initialRoutineData
      };

      const handleSelectDay = (dayId) => {
        setSelectedDayId(dayId);
        // You might want to load specific workout details here based on the selected day
        // and update `currentRoutine` state accordingly.
        console.log("Selected Day ID:", dayId);
        // Example: Find the day's data and set it as the current routine
        const dayData = allWeeksData[currentWeekIndex]?.days.find(d => d.id === dayId);
        if (dayData) {
            // If the day has a specific workout structure, load it.
            // Otherwise, maybe show a default or empty state for the routine.
            // For now, let's just update the day name in the existing structure.
            setCurrentRoutine(prev => ({
                ...prev, // Keep exercises for now
                day: dayData.name, // Update the day name
                name: dayData.workout || `Routine for ${dayData.name}` // Changed from `Rutina para ${dayData.name}`
            }));
        } else {
            // Handle case where day data isn't found (optional)
             setCurrentRoutine(initialRoutineData); // Reset to default or handle appropriately
        }
      };

      // Get the days for the currently selected week
      const currentDays = allWeeksData[currentWeekIndex]?.days || [];

    // Handler function to add a set to a specific exercise in the routine state
    // This is passed down to VistaCompleja
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

    // Handler to change the active view
    const handleSelectView = (viewKey) => {
        setActiveView(viewKey);
    };

    // Function to render the currently active view component
    const renderActiveView = () => {
      console.log("Rendering active view:", activeView); // <-- Add this log

        switch (activeView) {
            case 'VistaSimple':
                return <VistaSimple />; // Uses default internal data
            case 'VistaCompleja':
                // Pass the current routine state and the handler to add sets
                return <VistaCompleja routine={currentRoutine} onAddSet={handleAddSetToRoutine} />;
            case 'VistaExcel':
                return <VistaExcel />; // Uses default internal data
            case 'VistaEjercicios':
                return <VistaEjercicios />; // Uses default internal data
            case 'VistaRutinas':
                return <VistaRutinas />; // Uses default internal data
            case 'VistaFormulas':
                return <VistaFormulas />; // Uses default internal data
            case 'VistaRMS':
                return <VistaRMS />; // Uses default internal data
            case 'VistaNotas':
                return <VistaNotas />; // Uses default internal data
            case 'VistaResumen':
                return <VistaResumen />; // Uses default internal data
            default:
                // Fallback to VistaCompleja or show a message
                return <VistaCompleja routine={currentRoutine} onAddSet={handleAddSetToRoutine} />;
        }
    };


  return (
    <div className="routine-editor-container p-4 md:p-6"> {/* Added padding */}
      {/* Header */}
      <WorkoutCalendarHeader
        weeks={weeksForHeader}
        currentWeek={currentWeekIndex}
        handleWeekChange={handleWeekChange}
        setCurrentWeek={setCurrentWeekIndex}
        days={currentDays}
        selectedDayId={selectedDayId}
        handleSelectDay={handleSelectDay}
      />


      {/* Navigation Tabs - Pass the handler to update the view */}
      <VistasNavegacion onSelectView={handleSelectView} />


      {/* Conditionally Rendered View Section */}
      <div className="mt-6"> {/* Add margin top for separation */}
        {renderActiveView()}
      </div>

    </div>
  );
};

export default PaginadeEdicionDeRutinas;
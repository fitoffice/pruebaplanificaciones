import React, { useState, useEffect } from 'react';

// Placeholder save icon (CloseIcon removed as it's not a popup)
const SaveIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;

// Renamed component to follow English naming convention
const EditRoutineCSV2 = ({ routineData, onUpdateRoutine }) => {
  // Local state to manage edits
  const [editableRoutine, setEditableRoutine] = useState(null);

  // Update local state when routineData prop changes
  useEffect(() => {
    // Create a deep copy to avoid mutating the original prop
    if (routineData) {
      setEditableRoutine(JSON.parse(JSON.stringify(routineData)));
    } else {
      setEditableRoutine(null); // Reset if no routine data
    }
    // Removed isOpen from dependency array as it's no longer a prop
  }, [routineData]);

  // Render placeholder or nothing if no data
  if (!editableRoutine) {
      // You might want a loading state or placeholder here
      return <div className="p-4 text-gray-500">Loading routine data...</div>;
  }

  // Handle changes in input fields
  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedRoutine = JSON.parse(JSON.stringify(editableRoutine));
    // Ensure value is a number for numeric fields
    const numericValue = ['reps', 'weight', 'rest'].includes(field) ? Number(value) : value;
    updatedRoutine.exercises[exerciseIndex].sets[setIndex][field] = numericValue;
    setEditableRoutine(updatedRoutine);
  };

  // Handle saving changes
  const handleSaveChanges = () => {
    if (onUpdateRoutine) {
      onUpdateRoutine(editableRoutine); // Pass the updated data back to the parent
    } else {
        console.warn("onUpdateRoutine prop not provided to EditRoutineCSV2");
    }
    // Removed onClose() call as it's not a popup
  };

  // Removed handleBackdropClick as it's not a popup

  return (
    // Removed the outer fixed position div (popup wrapper)
    // Main container div - uses standard block layout now
    <div className="bg-white rounded-lg shadow-xl p-6 w-full border border-gray-200"> {/* Added border */}
        {/* Removed Close Button */}

        {/* Component Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Edit Routine: {editableRoutine.name} (CSV View)
        </h2>

        {/* Scrollable Table Content - kept overflow for potentially long tables */}
        <div className="overflow-x-auto mb-4"> {/* Changed to overflow-x-auto */}
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50"> {/* Removed sticky header, might not be needed */}
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercise</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Set</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repetitions</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rest (sec)</th>
                {/* Add Notas header if needed */}
                {/* <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {editableRoutine.exercises.map((exercise, exerciseIndex) => (
                <React.Fragment key={exercise.id || `ex-${exerciseIndex}`}>
                  {exercise.sets.length > 0 ? (
                    exercise.sets.map((set, setIndex) => (
                      <tr key={set.id || `set-${exerciseIndex}-${setIndex}`} className="hover:bg-gray-50">
                        {/* Show exercise name only for the first set */}
                        {setIndex === 0 ? (
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 align-top" rowSpan={exercise.sets.length || 1}> {/* Added align-top */}
                            {exercise.name}
                          </td>
                        ) : null}
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Set {setIndex + 1}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                            className="w-16 p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={set.weight}
                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                            className="w-16 p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={set.rest}
                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'rest', e.target.value)}
                            className="w-16 p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                         {/* Add Notas input if needed */}
                         {/* <td className="px-4 py-2 whitespace-nowrap"> <input type="text" ... /> </td> */}
                      </tr>
                    ))
                  ) : (
                    // Row for exercises with no sets yet
                    <tr key={exercise.id || `ex-${exerciseIndex}-nosets`} className="hover:bg-gray-50">
                       <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{exercise.name}</td>
                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400 italic" colSpan={4}>No sets added</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t mt-auto"> {/* Removed flex-shrink-0 */}
          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
          >
            <SaveIcon />
            <span>Save Changes</span>
          </button>
        </div>
    </div> // End of main container div
  );
};

export default EditRoutineCSV2; // Updated export name
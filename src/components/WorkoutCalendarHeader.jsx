import React from 'react';
// ... existing imports ...

// Note: Ensure Tailwind CSS is set up in your project.
// The component now relies on Tailwind classes defined globally or via CSS modules.

// This component receives data and handlers as props from its parent
const WorkoutCalendarHeader = ({
  weeks,
  currentWeek,
  handleWeekChange,
  setCurrentWeek,
  days, // This should now be the days data for the *currentWeek*
  selectedDayId, // New prop: ID of the currently selected day
  handleSelectDay, // New prop: Function to call when a day is clicked
  // ... other props ...
}) => {

  // Removed the hardcoded selectedDayName
  // const selectedDayName = 'Tuesday';

  // Placeholder for icons - consider using an SVG library like Heroicons
  // Updated SVGs to better match the image
  const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
  const TourIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l6-3m-6 3l6-3m0 0l-5.447 2.724A1 1 0 0115 16.382V5.618a1 1 0 011.447.894L21 7m0 10l-6-3m6 3V7" /></svg>; // Placeholder tour icon
  const ConfigIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; // Settings icon
  const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
  const LeftArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
  const RightArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
  const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
  const MoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;


  return (
    <> {/* Use Fragment to return multiple root elements */}
      {/* Header - Adjusted background, button colors and styles */}
      <div className="flex justify-between items-center mb-4 p-3 px-5 bg-white shadow"> {/* Changed background to white, reduced bottom margin */}
        <button className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors">
          <BackIcon /> Volver
        </button>
        <h3 className="text-lg font-bold m-0 text-gray-800">Planificacion Fuerza Pablo</h3> {/* Made text bold */}
        <div className="flex items-center space-x-2"> {/* Reduced space */}
          <button className="flex items-center px-3 py-1.5 border border-green-500 text-green-600 bg-white hover:bg-green-50 rounded transition-colors text-sm font-medium"> {/* Green ghost button */}
            <TourIcon /> Iniciar Tour
          </button>
          <button className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"> {/* Blue button */}
            <ConfigIcon /> Configuración
          </button>
        </div>
      </div>

      {/* Week Selector - Adjusted background, button styles */}
      <div className="mb-4 bg-indigo-600 text-white rounded-lg p-3"> {/* Added padding to the container */}
        {/* Week Selector Bar - Centered */}
        <div className="flex items-center justify-center relative mb-3"> {/* Centered content, relative for potential absolute positioning of arrows if needed, added bottom margin */}
          <button
            onClick={() => handleWeekChange('prev')}
            disabled={currentWeek === 0}
            // Position arrows absolutely if needed, or keep inline with justify-center
            // Using justify-center keeps them closer to the text
            className="p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-colors mx-4" // Added horizontal margin
          >
            <LeftArrowIcon />
          </button>
          {/* Central Text */}
          <div className="text-base flex items-center font-semibold">
            <CalendarIcon />
            <span>Semana {currentWeek + 1} de {weeks.length}</span>
          </div>
          <button
            onClick={() => handleWeekChange('next')}
            disabled={currentWeek === weeks.length - 1}
            // Position arrows absolutely if needed, or keep inline with justify-center
            className="p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-colors mx-4" // Added horizontal margin
          >
            <RightArrowIcon />
          </button>
        </div>

        {/* Week Tabs - Now inside the same container, removed margin-bottom */}
        <div className="flex space-x-3 overflow-x-auto pb-1"> {/* Reduced bottom padding/margin */}
          {weeks.map((week, index) => (
            <div
              key={week.id}
              // Styles remain the same as previous step
              className={`flex-shrink-0 w-44 p-3 text-center cursor-pointer rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 ease-in-out`}
              onClick={() => setCurrentWeek(index)}
            >
              <span className="block font-semibold text-sm text-white">{week.name}</span>
              <span className={`block text-xs mt-0.5 text-indigo-100`}>{week.dates}</span>
            </div>
          ))}
          {/* Styles remain the same as previous step */}
          <button className="flex-shrink-0 w-40 flex flex-col items-center justify-center p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            <PlusIcon />
            <span className="text-sm font-medium mt-1">Añadir Semana</span>
          </button>
        </div>
      </div> {/* End of combined container */}


      {/* Daily Workout Cards - Now selectable and uses selectedDayId prop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {days.map(day => (
          <div
            key={day.id}
            // Add onClick handler and update className logic
            onClick={() => handleSelectDay(day.id)} // Call handler on click
            className={`border rounded-lg bg-white shadow-sm transition-all duration-200 ease-in-out cursor-pointer
                        ${day.id === selectedDayId // Compare day.id with selectedDayId prop
                          ? 'border-2 border-black shadow-md'
                          : 'border-gray-300 hover:shadow-md hover:border-gray-400'}`}
          >
            <div className="p-2.5">
              <div className="flex justify-between items-center mb-1.5 pb-1.5 border-b border-gray-200">
                <span className="font-semibold text-sm text-gray-800">{day.name}</span>
                <span className="text-xs font-bold text-gray-600">{day.date}</span>
              </div>
              {day.workout ? (
                <div className="flex justify-between items-center bg-gray-100 p-1.5 rounded mt-1.5">
                  <span className="text-xs font-medium text-gray-700">{day.workout}</span>
                  <button className="text-gray-500 hover:text-gray-700 p-0.5 rounded">
                    <MoreIcon />
                  </button>
                </div>
              ) : (
                <button className="w-full flex items-center justify-center mt-1.5 py-1.5 border border-dashed border-gray-300 text-gray-500 rounded hover:border-gray-400 hover:text-gray-600 transition-colors text-xs">
                  <PlusIcon />
                  <span className="ml-1">Add Workout</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkoutCalendarHeader;
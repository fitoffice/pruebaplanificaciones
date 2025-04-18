import React, { useState } from 'react';
// Removed Ant Design imports

// Removed Ant Design specific constants
import ClientEditPopup from './popups/ClientEditPopup'; // Import the new popup component
import PeriodizationConfigurePopup from './popups/PeriodizationConfigurePopup'; // Import the new periodization popup component

const VistasSimplificadas = () => {
  // Placeholder data remains the same
  const clientName = "Fabio Priebe Sanchez";
  const clientAge = 22;

  // State to manage popup visibility
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isConfigurePopupOpen, setIsConfigurePopupOpen] = useState(false); // State for the new popup

  // --- Icon components remain the same ---
  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );

   const ConfigureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  // --- End of Icon components ---

  // Function to open the client edit popup
  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  // Function to close the client edit popup
  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  // Function to open the periodization configure popup
  const handleOpenConfigurePopup = () => {
    setIsConfigurePopupOpen(true);
  };

  // Function to close the periodization configure popup
  const handleCloseConfigurePopup = () => {
    setIsConfigurePopupOpen(false);
  };


  return (
    <> {/* Use Fragment to wrap multiple elements */}
      {/* Use flexbox/grid for layout, responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1"> {/* Added slight padding to container if needed */}

        {/* Client Information Card - Enhanced Styling */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-5 flex justify-between items-center transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
          <div className="flex items-center space-x-4">
            {/* Icon with Gradient Background */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <UserIcon />
            </div>
            {/* Text Content */}
            <div>
              <h5 className="text-base font-semibold text-gray-800 mb-0.5">Client Information</h5>
              <p className="text-sm text-gray-500">{`${clientName}, ${clientAge} years`}</p>
            </div>
          </div>
          {/* Enhanced Button with onClick handler */}
          <button
            onClick={handleOpenEditPopup} // Add onClick handler
            className="flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 text-xs font-medium py-2 px-4 rounded-full transition-colors duration-200"
          >
            <EditIcon />
            Edit
          </button>
        </div>


        {/* Periodization Card - Enhanced Styling */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-5 flex justify-between items-center transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
          <div className="flex items-center space-x-4">
            {/* Icon with Gradient Background */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <CalendarIcon />
            </div>
            {/* Text Content */}
            <div>
              <h5 className="text-base font-semibold text-gray-800 mb-0.5">Periodization</h5>
              <p className="text-sm text-gray-500">Configure training cycles and progression</p>
            </div>
          </div>
          {/* Enhanced Button with onClick handler */}
          <button
            onClick={handleOpenConfigurePopup} // Add onClick handler
            className="flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 text-xs font-medium py-2 px-4 rounded-full transition-colors duration-200"
          >
            <ConfigureIcon />
            Configure
          </button>
        </div>

      </div>

      {/* Conditionally render the client edit popup */}
      <ClientEditPopup
        isOpen={isEditPopupOpen}
        onClose={handleCloseEditPopup}
        clientName={clientName} // Pass data if needed
        clientAge={clientAge}   // Pass data if needed
      />

      {/* Conditionally render the periodization configure popup */}
      <PeriodizationConfigurePopup
        isOpen={isConfigurePopupOpen}
        onClose={handleCloseConfigurePopup}
        // Pass any relevant data for periodization here if needed
      />
    </>
  );
};

export default VistasSimplificadas;
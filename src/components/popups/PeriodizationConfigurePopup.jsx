import React from 'react';

// Simple Close Icon SVG (can be shared or redefined)
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PeriodizationConfigurePopup = ({ isOpen, onClose /*, other props... */ }) => {
  // If the popup is not open, render nothing
  if (!isOpen) {
    return null;
  }

  // Handle clicks outside the modal content to close it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-50 transform transition-transform duration-300 ease-in-out scale-100"> {/* Adjusted max-w */}
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Configure Periodization</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close popup"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body - Placeholder Content */}
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Configure the training cycles, phases, and progression model for the client's routine.
          </p>
          {/* Example Form Fields (replace with actual configuration options) */}
          <div>
            <label htmlFor="cycleLength" className="block text-sm font-medium text-gray-700 mb-1">
              Cycle Length (Weeks)
            </label>
            <input
              type="number"
              id="cycleLength"
              defaultValue={4} // Example default
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="progressionModel" className="block text-sm font-medium text-gray-700 mb-1">
              Progression Model
            </label>
            <select
              id="progressionModel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Linear Progression</option>
              <option>Undulating Periodization</option>
              <option>Block Periodization</option>
            </select>
          </div>
          {/* Add more configuration options here */}
        </div>

        {/* Footer - Action Buttons */}
        <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            // Add your save logic here
            className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-md transition-colors"
          >
            Apply Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodizationConfigurePopup;
import React from 'react';

// Simple Close Icon SVG
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ClientEditPopup = ({ isOpen, onClose, clientName, clientAge }) => {
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
    // Backdrop (semi-transparent background)
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleBackdropClick} // Close on backdrop click
    >
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-50 transform transition-transform duration-300 ease-in-out scale-100"> {/* Added transform for potential animations */}
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Client Information</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close popup"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body - Form Placeholder */}
        <form>
          <div className="mb-4">
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="clientName"
              defaultValue={clientName} // Use defaultValue for uncontrolled or manage with state
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientAge" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="clientAge"
              defaultValue={clientAge} // Use defaultValue for uncontrolled or manage with state
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Add more form fields as needed */}
        </form>

        {/* Footer - Action Buttons */}
        <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            // Add your save logic here, e.g., onClick={handleSaveChanges}
            className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientEditPopup;
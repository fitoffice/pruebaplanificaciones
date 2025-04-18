import React from 'react';

// Placeholder Close Icon
const CloseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const PopupCrearSesion = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Don't render anything if the popup is not open
  }

  // Stop click propagation inside the popup content to prevent closing when clicking inside
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay covering the whole screen
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close popup when clicking the overlay
    >
      {/* Popup Content Box */}
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={handleContentClick} // Prevent closing when clicking inside the content
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Crear Nueva Sesión</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body - Add your form elements or content here */}
        <div className="space-y-4">
          <p className="text-gray-600">Aquí iría el contenido para crear la sesión...</p>
          {/* Example Input */}
          <div>
            <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Sesión</label>
            <input
              type="text"
              id="sessionName"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Sesión de Martes"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Cancelar
          </button>
          <button
            // Add your save/create logic here
            onClick={() => { console.log('Crear presionado'); onClose(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Crear
          </button>
        </div>
      </div>
      {/* Basic CSS for animation (add to your global CSS or use Tailwind's animation utilities if configured) */}
      <style jsx global>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PopupCrearSesion;
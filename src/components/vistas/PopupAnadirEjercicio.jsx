import React from 'react';

// Placeholder Close Icon
const CloseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const PopupAnadirEjercicio = ({ isOpen, onClose, routineName }) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      {/* Popup Content Box */}
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Añadir Ejercicio a "{routineName}"</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body - Add form elements for adding an exercise */}
        <div className="space-y-4">
          <p className="text-gray-600">Busca o crea un nuevo ejercicio para añadir a esta rutina.</p>
          {/* Example Input - Search/Select Exercise */}
          <div>
            <label htmlFor="exerciseName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Ejercicio</label>
            <input
              type="text"
              id="exerciseName"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar ejercicio existente o escribir nuevo nombre..."
            />
            {/* Consider adding search results or a 'create new' button here */}
          </div>
          {/* Maybe add initial set configuration? */}

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
            // Add your save/add logic here
            onClick={() => { console.log('Añadir ejercicio presionado'); onClose(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Añadir Ejercicio
          </button>
        </div>
      </div>
      {/* Ensure animation style is available */}
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

export default PopupAnadirEjercicio;
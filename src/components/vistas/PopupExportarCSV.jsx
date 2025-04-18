import React, { useState } from 'react';

// Placeholder close icon
const CloseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

// Added onExport prop to handle the actual export logic
const PopupExportarCSV = ({ isOpen, onClose, onExport }) => {
  // State for export options
  const [includeEjercicio, setIncludeEjercicio] = useState(true);
  const [includeSeries, setIncludeSeries] = useState(true);
  const [includeRepeticiones, setIncludeRepeticiones] = useState(true);
  const [includePeso, setIncludePeso] = useState(true);
  const [includeDescanso, setIncludeDescanso] = useState(true);
  const [includeNotas, setIncludeNotas] = useState(true);
  const [filename, setFilename] = useState('rutina_exportada.csv'); // Default filename

  if (!isOpen) return null;

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Function to handle the export button click
  const handleExportClick = () => {
    const exportOptions = {
      columns: {
        ejercicio: includeEjercicio,
        series: includeSeries,
        repeticiones: includeRepeticiones,
        peso: includePeso,
        descanso: includeDescanso,
        notas: includeNotas,
      },
      filename: filename || 'rutina_exportada.csv', // Use default if empty
    };
    // Call the onExport function passed via props, providing the options
    if (onExport) {
      onExport(exportOptions);
    } else {
      console.warn("onExport prop not provided to PopupExportarCSV");
    }
    onClose(); // Close the popup after initiating export
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick} // Close on backdrop click
    >
      {/* Increased max-w-lg for more space */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <CloseIcon />
        </button>

        {/* Popup Title */}
        <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Exportar Rutina a CSV</h2>

        {/* Popup Content */}
        <div className="space-y-4">
          {/* Filename Input */}
          <div>
            <label htmlFor="csv-filename" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Archivo:
            </label>
            <input
              type="text"
              id="csv-filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="rutina_exportada.csv"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Column Selection */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Incluir Columnas:
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {/* Checkbox examples - Add more as needed based on image columns */}
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeEjercicio} onChange={(e) => setIncludeEjercicio(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="text-sm text-gray-600">Ejercicio</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeSeries} onChange={(e) => setIncludeSeries(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="text-sm text-gray-600">Series</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeRepeticiones} onChange={(e) => setIncludeRepeticiones(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="text-sm text-gray-600">Repeticiones</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includePeso} onChange={(e) => setIncludePeso(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="text-sm text-gray-600">Peso</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeDescanso} onChange={(e) => setIncludeDescanso(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="text-sm text-gray-600">Descanso</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeNotas} onChange={(e) => setIncludeNotas(e.target.checked)} className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="text-sm text-gray-600">Notas</span>
              </label>
            </div>
          </div>

          {/* Export Button */}
          <div className="pt-4 border-t mt-6">
            <button
              onClick={handleExportClick} // Use the handler
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
            >
              {/* Optional: Add an icon */}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span>Exportar Ahora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupExportarCSV;
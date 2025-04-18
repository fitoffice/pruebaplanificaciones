import React, { useState } from 'react';
// Placeholder icons - replace with actual icons from a library like Heroicons
const PlaceholderIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const ListIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const GridIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const ChartIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const DocIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ClockIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CalculatorIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-6 4h6m-6 4h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10l-3 3z" /></svg>; // Example for Formulas
const DumbbellIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6l-2 2-2-2m4 0V4m0 2v2m0-2h2m-2 0H8m4 12l2-2 2 2m-4 0v2m0-2v-2m0 2H8m4 0h2M4 12h16" /></svg>; // Example for Ejercicios
const ClipboardListIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>; // Example for Rutinas
const NoteIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>; // Example for Notas
const SummaryIcon = ({ className = "w-5 h-5" }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m-9 4h12M3 7h18M5 7h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>; // Example for Resumen


// Accept onSelectView prop by destructuring it from the props object
const VistasNavegacion = ({ onSelectView }) => {
  // State to track the index of the selected main view (-1 means none selected)
  const [selectedViewIndex, setSelectedViewIndex] = useState(0); // Start with first view open

  // Data structure for the views with unique keys for subViews
  const views = [
    {
      title: "Vistas Principales",
      icon: <GridIcon className="w-4 h-4 mr-2 text-indigo-600" />,
      bgColor: "bg-indigo-500", // Purple tone
      hoverBgColor: "hover:bg-indigo-600",
      textColor: "text-white",
      subViews: [
        // Add the 'key' property matching the component names
        { key: "VistaSimple", text: "Simplificada", icon: <ListIcon className="w-4 h-4" /> },
        { key: "VistaCompleja", text: "Compleja", icon: <GridIcon className="w-4 h-4" /> },
        { key: "VistaExcel", text: "Excel", icon: <GridIcon className="w-4 h-4" /> },
      ]
    },
    {
      title: "Análisis y Seguimiento",
      icon: <ChartIcon className="w-4 h-4 mr-2 text-teal-600" />,
      bgColor: "bg-teal-500", // Teal tone
      hoverBgColor: "hover:bg-teal-600",
      textColor: "text-white",
      subViews: [
        // Add the 'key' property matching the component names
        { key: "VistaEjercicios", text: "Ejercicios", icon: <DumbbellIcon className="w-4 h-4" /> },
        { key: "VistaRutinas", text: "Rutinas", icon: <ClipboardListIcon className="w-4 h-4" /> },
        { key: "VistaFormulas", text: "Formulas", icon: <CalculatorIcon className="w-4 h-4" /> },
      ]
    },
    {
      title: "Gestión y Recursos",
      icon: <DocIcon className="w-4 h-4 mr-2 text-cyan-600" />,
      bgColor: "bg-cyan-500", // Cyan/Teal tone
      hoverBgColor: "hover:bg-cyan-600",
      textColor: "text-white",
      subViews: [
        // Add the 'key' property matching the component names
        { key: "VistaRMS", text: "RMS", icon: <ChartIcon className="w-4 h-4" /> },
        { key: "VistaNotas", text: "Notas", icon: <NoteIcon className="w-4 h-4" /> },
        { key: "VistaResumen", text: "Resumen", icon: <SummaryIcon className="w-4 h-4" /> },
      ]
    }
  ];

  // Function to handle clicking a main view button
  const handleViewClick = (index) => {
    setSelectedViewIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  // Function to handle clicking a sub-view button
  const handleSubViewClick = (viewKey) => {
    console.log("Sub view clicked, key:", viewKey); // Keep this log for now
    if (onSelectView) { // This check should now work correctly
      onSelectView(viewKey); // Call the handler passed from the parent
    } else {
      console.warn("onSelectView prop not provided to VistasNavegacion");
    }
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-8"> {/* Increased spacing */}
      {views.map((view, index) => (
        <div key={index} className="w-full md:w-1/3 flex flex-col"> {/* Added flex-col */}
          {/* Main View Button */}
          <button
            onClick={() => handleViewClick(index)}
            // Enhanced transitions for shadow and color, added hover shadow
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out shadow hover:shadow-md ${
              selectedViewIndex === index
                ? 'bg-gray-800 text-white shadow-lg scale-[1.02]' // Darker selected bg, larger shadow, slight scale
                : 'bg-white text-gray-700 hover:bg-gray-50' // Lighter hover bg
            }`}
          >
            {view.icon}
            {view.title}
          </button>

          {/* Conditionally rendered Sub-view buttons container */}
          <div
            className={`mt-2 space-y-2 bg-white rounded-lg shadow-md p-3 overflow-hidden transition-all duration-500 ease-out flex-grow ${
              selectedViewIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0 border-0'
            }`}
            style={{ willChange: 'max-height, opacity' }}
          >
            {view.subViews.map((subView) => ( // Use subView.key for the React key prop
              <button
                key={subView.key} // Use the unique key we added
                onClick={() => handleSubViewClick(subView.key)} // Pass the key to the handler
                className={`w-full flex items-center justify-between px-3 py-2 rounded ${view.bgColor} ${view.textColor} ${view.hoverBgColor} transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:brightness-110 text-sm`}
              >
                <span className="flex items-center mr-2">
                  {subView.icon}
                </span>
                <span className="truncate flex-1 text-left ml-2">{subView.text}</span> {/* Adjusted text span */}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VistasNavegacion;
import React, { useState } from 'react';
import { Calendar, Plus, Download, ChevronLeft, ChevronRight, Search, Filter, Edit, Trash2, ChevronDown, ArrowRightLeft, Check } from 'lucide-react';

// Placeholder data (replace with actual data and logic)
const planningInfo = {
  name: 'Planificación Ejemplo',
  description: 'Ejemplo1',
  weeks: 5,
  startDate: '14/4/2025',
  creationDate: '10/4/2025',
  lastUpdate: '10/4/2025',
};

const initialDays = Array.from({ length: planningInfo.weeks * 7 }, (_, i) => ({
  id: `d${i + 1}`,
  dayNumber: i + 1,
  weekNumber: Math.floor(i / 7) + 1,
  dayOfWeekIndex: i % 7, // 0 for Monday, 6 for Sunday
  dayName: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][i % 7],
  isSelected: false, // Example: Select first week
}));

const sampleExercises = [
    { id: 'ex1', name: 'Gemelo Máquina' },
    { id: 'ex2', name: 'Extensión de Quadriceps' },
    { id: 'ex3', name: 'Press Mancuerna Inclinado' },
    { id: 'ex4', name: 'Peso Muerto Rumano' },
    { id: 'ex5', name: 'Press Inclinado' },
];

// --- Sub Components ---

// Day Button Component
const DayButton = ({ day, onClick, isSelected }) => (
  <button
    onClick={() => onClick(day.id)}
    className={`p-3 rounded-lg text-center transition-colors duration-150 ease-in-out ${
      isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-white hover:bg-indigo-100 text-gray-700 border border-gray-200'
    }`}
  >
    <div className="font-semibold text-lg">{day.dayNumber}</div>
    <div className="text-xs mt-1">{day.dayName}</div>
  </button>
);

// Period Card Component (Simplified)
const PeriodCard = ({ period }) => {
    const [isOpen, setIsOpen] = useState(true); // Default to open

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 mb-4">
            {/* Period Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-700">{period.number}</span>
                    <span className="text-sm text-gray-600">Periodo {period.number}</span>
                    <div className="flex items-center text-sm text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        <ChevronLeft size={14} className="mr-1" />
                        <span>Semana {period.startWeek} dia {period.startDay}</span>
                        <span className="mx-2 text-gray-400">a</span>
                        <span>Semana {period.endWeek} dia {period.endDay}</span>
                        <ChevronRight size={14} className="ml-1" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md flex items-center">
                        <Check size={14} className="mr-1" /> Aplicar Periodo
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700"><Edit size={16} /></button>
                    <button className="p-1 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-gray-500 hover:text-gray-700">
                        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Period Content (Exercises) - Collapsible */}
            {isOpen && (
                <div className="p-4">
                    <div className="relative mb-4">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar ejercicios..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                            <Filter size={14} className="mr-1" /> Filtros
                        </button>
                    </div>

                    <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center justify-center">
                        <ArrowRightLeft size={16} className="mr-2 text-indigo-500" /> Ejercicios disponibles
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sampleExercises.map(ex => (
                            <div key={ex.id} className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-center">
                                <span className="text-sm text-gray-700 flex items-center">
                                    <ArrowRightLeft size={16} className="mr-2 text-indigo-400" /> {ex.name}
                                </span>
                                <div className="flex space-x-2">
                                     <button className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded">Aplicar</button>
                                     <button className="text-xs bg-gray-600 hover:bg-gray-700 text-white p-1 rounded"><Plus size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Main Component ---
const VistaFormulas = () => {
  const [days, setDays] = useState(initialDays);
  const [selectedDayIds, setSelectedDayIds] = useState(new Set());
  const [periods, setPeriods] = useState([ // Placeholder period
    { number: 1, startWeek: 1, startDay: 1, endWeek: 1, endDay: 5 }
  ]);

  const handleDayClick = (dayId) => {
    setSelectedDayIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(dayId)) {
        newSelected.delete(dayId);
      } else {
        newSelected.add(dayId);
      }
      return newSelected;
    });
    // In a real app, you'd update the 'days' state isSelected property too,
    // or derive isSelected directly from selectedDayIds for rendering
  };

  const handleAddWeek = () => {
      // Placeholder: Logic to add another week's worth of days
      console.log("Adding week...");
      // Update planningInfo.weeks and regenerate/append days
  };

  const handleCreatePeriod = () => {
      // Placeholder: Logic to create a period from selectedDayIds
      console.log("Creating period from selected:", selectedDayIds);
      // Add the new period to the 'periods' state
  };

  const numWeeks = planningInfo.weeks; // Use state if weeks can change

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* 1. Planning Information */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">Esqueleto - Planificación</h2>
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center">
                <Download size={16} className="mr-2" /> Exportar Esqueleto
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
          <p><strong className="text-gray-800">Nombre:</strong> {planningInfo.name}</p>
          <p><strong className="text-gray-800">Fecha de inicio:</strong> {planningInfo.startDate}</p>
          <p><strong className="text-gray-800">Descripción:</strong> {planningInfo.description}</p>
          <p><strong className="text-gray-800">Fecha de creación:</strong> {planningInfo.creationDate}</p>
          <p><strong className="text-gray-800">Semanas:</strong> {planningInfo.weeks}</p>
          <p><strong className="text-gray-800">Última actualización:</strong> {planningInfo.lastUpdate}</p>
        </div>
      </div>

      {/* 2. Day Selection */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">Selecciona los días para crear un periodo</h3>
          <button
             onClick={handleAddWeek}
             className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center"
           >
             <Plus size={16} className="mr-1" /> Añadir Semana
           </button>
        </div>

        {/* Day Grid Header */}
        <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-2 mb-2 text-center text-sm font-medium text-gray-500">
            <div className="p-2 rounded bg-gray-100">Semana</div>
            {['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'].map(header => (
                <div key={header} className="p-2 rounded bg-gray-100 flex items-center justify-center"><Calendar size={14} className="mr-1"/>{header}</div>
            ))}
        </div>

        {/* Day Grid Body */}
        <div className="space-y-2">
            {Array.from({ length: numWeeks }).map((_, weekIndex) => (
                <div key={`week-${weekIndex}`} className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-2 items-center">
                    {/* Week Number */}
                    <div className="p-3 rounded-lg text-center bg-blue-100 text-blue-700 font-semibold">
                        {weekIndex + 1}
                    </div>
                    {/* Days */}
                    {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map(day => (
                        <DayButton
                            key={day.id}
                            day={day}
                            isSelected={selectedDayIds.has(day.id)}
                            onClick={handleDayClick}
                        />
                    ))}
                </div>
            ))}
        </div>
         {/* Add Period Button - Appears when days are selected */}
         {selectedDayIds.size > 0 && (
            <div className="mt-4 text-right">
                <button
                    onClick={handleCreatePeriod}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center ml-auto"
                >
                    <Plus size={16} className="mr-1" /> Crear Periodo con {selectedDayIds.size} días
                </button>
            </div>
        )}
      </div>

      {/* 3. Selected Periods & Exercises */}
       <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Periodos Seleccionados</h2>
            {periods.length > 0 ? (
                periods.map(period => <PeriodCard key={period.number} period={period} />)
            ) : (
                <p className="text-center text-gray-500 py-4">No hay periodos creados. Selecciona días y haz clic en "Crear Periodo".</p>
            )}
       </div>

    </div>
  );
};

export default VistaFormulas;
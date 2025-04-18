import React, { useState } from 'react';
import { BarChart, ChevronDown, Star, Dumbbell, Plus } from 'lucide-react'; // Example icons

// Placeholder data (replace with actual data)
const sampleRoutines = [
  {
    id: 'rt1',
    title: 'Pechotes',
    author: 'intensa22',
    rating: 4.8,
    tags: ['Push'],
    exerciseCount: 1,
    imageUrl: 'https://via.placeholder.com/400x200/cccccc/808080?text=Workout+Image+1', // Replace with actual image URL
    description: null, // No description shown in the first card
  },
  {
    id: 'rt2',
    title: 'Pierna',
    author: 'rutina rapida',
    rating: 4.8,
    tags: ['Legs'],
    exerciseCount: 4,
    imageUrl: 'https://via.placeholder.com/400x200/bbbbbb/707070?text=Workout+Image+2', // Replace with actual image URL
    description: null,
  },
  {
    id: 'rt3',
    title: 'HOLA',
    author: 'HOLA',
    rating: 4.8,
    tags: ['Masa muscular', 'Push', 'Avanzado'],
    exerciseCount: 3,
    imageUrl: 'https://via.placeholder.com/400x200/aaaaaa/606060?text=Workout+Image+3', // Replace with actual image URL
    description: null,
  },
  {
    id: 'rt4',
    title: 'Rutina de Ganancia de Masa Corporal',
    author: null, // No author shown
    rating: 4.8,
    tags: ['Tag1', 'Tag2', 'Tag3'], // Placeholder tags based on image blur
    exerciseCount: null, // Not shown clearly
    imageUrl: 'https://via.placeholder.com/400x200/999999/505050?text=Workout+Image+4', // Replace with actual image URL
    description: 'Esta rutina está diseñada para aumentar la masa muscular en todo el cuerpo, ideal para aquellos con un nivel intermedio de condición física.',
  },
  {
    id: 'rt5',
    title: 'Rutina de Quema de Grasa Avanzada',
    author: null,
    rating: 4.8,
    tags: [], // No tags shown clearly
    exerciseCount: null,
    imageUrl: 'https://via.placeholder.com/400x200/888888/404040?text=Workout+Image+5', // Replace with actual image URL
    description: 'Esta rutina de cuerpo completo está diseñada para ayudarte a perder grasa de manera eficiente y mantener tu condición física avanzada. Combina ejercicios de fuerza y resistencia para maximizar la quema de calorías.',
  },
  {
    id: 'rt6',
    title: 'Rutina de Pull para Ganar Masa',
    author: null,
    rating: 4.8,
    tags: ['Pull', 'Intermedio'], // Placeholder tags
    exerciseCount: null,
    imageUrl: 'https://via.placeholder.com/400x200/777777/303030?text=Workout+Image+6', // Replace with actual image URL
    description: 'Esta rutina se enfoca en el desarrollo de la musculatura de la espalda, bíceps y antebrazos para promover el crecimiento muscular.',
  },
];

// Component for a single routine card
const RoutineCard = ({ routine }) => {
  const handleAddRoutine = () => console.log('Adding routine:', routine.id); // Placeholder

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
      <img src={routine.imageUrl} alt={routine.title} className="w-full h-32 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-md font-semibold text-gray-800">{routine.title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Star size={16} className="text-yellow-400 mr-1 fill-current" />
            {routine.rating.toFixed(1)}
          </div>
        </div>
        {routine.author && <p className="text-xs text-gray-500 mb-2">{routine.author}</p>}
        {routine.description && <p className="text-xs text-gray-600 mb-3 flex-grow">{routine.description}</p>}

        <div className="flex flex-wrap gap-1 mb-3 mt-auto"> {/* mt-auto pushes tags and below down */}
          {routine.tags.map(tag => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          {routine.exerciseCount !== null && (
             <span className="flex items-center">
               <Dumbbell size={14} className="mr-1 text-gray-400" /> {routine.exerciseCount} ejercicios
             </span>
          )}
           {routine.exerciseCount === null && <div></div>} {/* Placeholder to maintain layout */}
          <button
            onClick={handleAddRoutine}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-1 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
          >
            <Plus size={14} className="mr-1" /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const VistaRutinas = ({ routines = sampleRoutines }) => {
  // Placeholder state for filters
  const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
  const [levelFilter, setLevelFilter] = useState('Todos los niveles');

  // Placeholder filter logic (implement actual filtering based on state)
  const filteredRoutines = routines; // Replace with actual filtering

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <BarChart size={20} className="mr-2 text-blue-600" /> Rutinas Predefinidas
        </h2>
        <div className="flex items-center space-x-2">
          {/* Placeholder Dropdowns */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-md py-1.5 pl-3 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option>Todas las categorías</option>
              <option>Pecho</option>
              <option>Pierna</option>
              {/* Add more categories */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="relative">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-md py-1.5 pl-3 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option>Todos los niveles</option>
              <option>Principiante</option>
              <option>Intermedio</option>
              <option>Avanzado</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Routine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredRoutines.map(routine => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
};

export default VistaRutinas;
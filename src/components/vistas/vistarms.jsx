import React from 'react';

// Example data structure
const exerciseProgress = [
  {
    name: 'Press Inclinado',
    records: [
      { date: '15/04/2025, 22:37', rm: 210 },
      { date: '26/03/2025, 15:26', rm: 200 },
      { date: '26/03/2025, 14:07', rm: 100 },
    ],
  },
  {
    name: 'Extensión de Quadriceps',
    records: [
      { date: '26/03/2025, 13:12', rm: 38 },
      { date: '25/03/2025, 15:00', rm: 20 },
    ],
  },
];

const Vistarms = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">
            Seguimiento del progreso de tus ejercicios
          </h2>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-medium shadow transition">
            + Añadir RM
          </button>
        </div>

        {exerciseProgress.map((exercise, idx) => (
          <div key={exercise.name} className="mb-8">
            <div className="bg-gradient-to-r from-blue-800 to-blue-500 rounded-t-lg px-6 py-3 flex items-center">
              <span className="text-white font-semibold text-base mr-2">
                <svg width="18" height="18" fill="none" className="inline-block mr-2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {exercise.name}
              </span>
              <span className="ml-auto text-white text-xs font-medium">RM (KG)</span>
            </div>
            <div className="bg-white rounded-b-lg px-6 py-2 border border-t-0 border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  {exercise.records.map((rec, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="py-2 text-gray-700">{rec.date}</td>
                      <td className="py-2 text-right font-semibold text-blue-700">{rec.rm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vistarms;
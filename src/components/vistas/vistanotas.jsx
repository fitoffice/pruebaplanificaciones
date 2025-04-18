import React, { useState } from 'react';

const Vistanotas = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    important: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([...notes, newNote]);
      setNewNote({ title: '', content: '', important: false });
      setShowForm(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">
            Notas del Plan
          </h2>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-medium shadow transition"
          >
            + Nueva Nota
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Nueva Nota</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Título"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                />
                <textarea
                  placeholder="Contenido"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 h-32"
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="important"
                    className="mr-2"
                    checked={newNote.important}
                    onChange={(e) => setNewNote({...newNote, important: e.target.checked})}
                  />
                  <label htmlFor="important">Marcar como importante</label>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg"
                >
                  Guardar Nota
                </button>
              </form>
            </div>
          </div>
        )}

        {notes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay notas disponibles</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${note.important ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
              >
                <h3 className="font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vistanotas;
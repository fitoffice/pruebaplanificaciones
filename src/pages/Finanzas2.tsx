import React, { useState, useMemo } from 'react';

// Define the structure for a financial transaction
interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string; // Added category for better tracking
  type: 'Ingreso' | 'Gasto';
  amount: number;
}

// Define the structure for the component props (if any were needed)
interface Finanzas2Props {
  // Example: initialData?: Transaction[];
}

export default function Finanzas2({ /* initialData = [] */ }: Finanzas2Props) {
  // State for managing the list of transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Initial sample data
    { id: 1, date: '2024-07-01', description: 'Ingreso por Consultoría', category: 'Servicios', type: 'Ingreso', amount: 2500 },
    { id: 2, date: '2024-07-02', description: 'Pago de Software', category: 'Operaciones', type: 'Gasto', amount: 150 },
    { id: 3, date: '2024-07-05', description: 'Venta Producto X', category: 'Ventas', type: 'Ingreso', amount: 950 },
    { id: 4, date: '2024-07-07', description: 'Compra de Material Oficina', category: 'Administrativo', type: 'Gasto', amount: 85 },
    { id: 5, date: '2024-07-10', description: 'Pago Nómina', category: 'Recursos Humanos', type: 'Gasto', amount: 3200 },
  ]);

  // State for controlling the visibility of the add transaction modal
  const [showModal, setShowModal] = useState(false);

  // State for holding the data of the new transaction being added
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0], // Default to today's date
    description: '',
    category: '', // Initialize category
    type: 'Ingreso', // Default type
    amount: 0,
  });

  // Calculate financial summary using useMemo for optimization
  const { ingresos, gastos, balance } = useMemo(() => {
    const ingresos = transactions
      .filter(t => t.type === 'Ingreso')
      .reduce((sum, t) => sum + t.amount, 0);
    const gastos = transactions
      .filter(t => t.type === 'Gasto')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = ingresos - gastos;
    return { ingresos, gastos, balance };
  }, [transactions]); // Recalculate only when transactions change

  // Function to handle adding a new transaction
  const handleAddTransaction = () => {
    // Basic validation
    if (!newTransaction.date || !newTransaction.description || !newTransaction.category || newTransaction.amount <= 0) {
        alert('Por favor complete todos los campos y asegúrese que el monto sea positivo.');
        return;
    }
    // Add the new transaction to the state
    setTransactions(prevTransactions => [
      ...prevTransactions,
      {
        id: Date.now(), // Use timestamp for a unique ID
        ...newTransaction,
        amount: Number(newTransaction.amount), // Ensure amount is a number
      }
    ]);
    // Close the modal
    setShowModal(false);
    // Reset the new transaction form
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: '',
      type: 'Ingreso',
      amount: 0,
    });
  };

  // Function to handle deleting a transaction (Optional Enhancement)
  const handleDeleteTransaction = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta transacción?')) {
        setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto"> {/* Increased max-width for potentially wider layout */}
        <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Módulo de Finanzas Avanzado</h1>
            <p className="mt-2 text-lg text-gray-600">Gestión integral de ingresos y gastos.</p>
        </header>

        {/* Financial Summary Cards - Enhanced Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Income Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Ingresos Totales</span>
                <span className="text-green-500 text-xl">▲</span>
              </div>
              <span className="block mt-2 text-3xl font-bold text-green-600">${ingresos.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          {/* Expense Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Gastos Totales</span>
                <span className="text-red-500 text-xl">▼</span>
              </div>
              <span className="block mt-2 text-3xl font-bold text-red-600">${gastos.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          {/* Balance Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Balance Actual</span>
                <span className={`text-xl ${balance >= 0 ? 'text-blue-500' : 'text-yellow-500'}`}>
                    {balance >= 0 ? '●' : '⚠️'}
                </span>
              </div>
              <span className={`block mt-2 text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ${balance.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Transacciones Recientes</h2>
            <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Agregar Transacción
            </button>
        </div>

        {/* Transactions Table - Enhanced Styling and Delete Button */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length > 0 ? (
                    transactions.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((t) => ( // Sort by date descending
                    <tr key={t.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(t.date).toLocaleDateString('es-ES')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === 'Ingreso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {t.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${t.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'Gasto' ? '-' : '+'}${t.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <button
                           onClick={() => handleDeleteTransaction(t.id)}
                           className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                           title="Eliminar"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                           </svg>
                         </button>
                       </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500 text-lg">No hay transacciones registradas todavía.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Adding Transaction - Enhanced Styling */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Nueva Transacción</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction(); }}> {/* Handle submit on form */}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input
                      id="date"
                      type="date"
                      value={newTransaction.date}
                      onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <input
                      id="description"
                      type="text"
                      placeholder="Ej: Venta de servicios"
                      value={newTransaction.description}
                      onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      required
                    />
                  </div>
                   <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <input
                      id="category"
                      type="text"
                      placeholder="Ej: Marketing, Operaciones, Ventas"
                      value={newTransaction.category}
                      onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                      <select
                        id="type"
                        value={newTransaction.type}
                        onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value as 'Ingreso' | 'Gasto' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white"
                      >
                        <option value="Ingreso">Ingreso</option>
                        <option value="Gasto">Gasto</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                              id="amount"
                              type="number"
                              value={newTransaction.amount === 0 ? '' : newTransaction.amount} // Show placeholder when 0
                              onChange={e => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) || 0 })}
                              className="block w-full rounded-md border-gray-300 pl-7 pr-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="0.00"
                              min={0.01} // Ensure positive amount
                              step={0.01} // Allow decimals
                              required
                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3 border-t pt-5">
                  <button
                    type="button" // Prevent default form submission
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit" // Submit the form
                    className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Guardar Transacción
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add CSS for modal animation if not using a library */}
        <style jsx global>{`
            @keyframes modal-appear {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            .animate-modal-appear {
                animation: modal-appear 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
}
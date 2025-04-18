import React, { useState } from 'react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'Ingreso' | 'Gasto';
  amount: number;
}

export default function Finanzas1() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2024-06-01', description: 'Venta producto A', type: 'Ingreso', amount: 1200 },
    { id: 2, date: '2024-06-02', description: 'Pago alquiler', type: 'Gasto', amount: 500 },
    { id: 3, date: '2024-06-03', description: 'Venta producto B', type: 'Ingreso', amount: 800 },
    { id: 4, date: '2024-06-04', description: 'Compra insumos', type: 'Gasto', amount: 300 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: '',
    description: '',
    type: 'Ingreso',
    amount: 0,
  });

  const ingresos = transactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + t.amount, 0);
  const gastos = transactions.filter(t => t.type === 'Gasto').reduce((sum, t) => sum + t.amount, 0);
  const balance = ingresos - gastos;

  const handleAddTransaction = () => {
    if (!newTransaction.date || !newTransaction.description || !newTransaction.amount) return;
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        ...newTransaction,
        amount: Number(newTransaction.amount),
      }
    ]);
    setShowModal(false);
    setNewTransaction({
      date: '',
      description: '',
      type: 'Ingreso',
      amount: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Módulo de Finanzas</h1>
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Ingresos</span>
            <span className="text-2xl font-bold text-green-600">${ingresos.toLocaleString()}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Gastos</span>
            <span className="text-2xl font-bold text-red-600">${gastos.toLocaleString()}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Balance</span>
            <span className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ${balance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            + Agregar Transacción
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.slice().reverse().map((t) => (
                <tr key={t.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{t.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === 'Ingreso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right font-bold ${t.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'Gasto' ? '-' : ''}${t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No hay transacciones recientes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for Adding Transaction */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Agregar Transacción</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    value={newTransaction.type}
                    onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value as 'Ingreso' | 'Gasto' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="Ingreso">Ingreso</option>
                    <option value="Gasto">Gasto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monto</label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={e => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    min={0}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTransaction}
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
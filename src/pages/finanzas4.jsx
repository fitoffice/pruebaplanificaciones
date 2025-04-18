import React, { useState } from 'react';
import { Card, Table, Button, Modal, Input, DatePicker, Select } from 'antd';
import { DollarOutlined, ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import './finanzas4.css';

const { Option } = Select;

const Finanzas4 = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-05-15', description: 'Venta Producto A', amount: 1200, type: 'income', category: 'Ventas' },
    { id: 2, date: '2023-05-14', description: 'Pago Nómina', amount: 3500, type: 'expense', category: 'Personal' },
    { id: 3, date: '2023-05-12', description: 'Compra Materiales', amount: 800, type: 'expense', category: 'Compras' },
    { id: 4, date: '2023-05-10', description: 'Servicio Cliente B', amount: 950, type: 'income', category: 'Servicios' },
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'income',
    category: ''
  });

  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenseTotal = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = incomeTotal - expenseTotal;

  const columns = [
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    { 
      title: 'Monto', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount, record) => (
        <span style={{ color: record.type === 'income' ? 'green' : 'red' }}>
          {record.type === 'income' ? '+' : '-'}${amount.toLocaleString()}
        </span>
      )
    },
    { title: 'Categoría', dataIndex: 'category', key: 'category' },
  ];

  const handleAddTransaction = () => {
    setTransactions([...transactions, {
      id: transactions.length + 1,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    }]);
    setIsModalVisible(false);
    setNewTransaction({
      date: '',
      description: '',
      amount: '',
      type: 'income',
      category: ''
    });
  };

  return (
    <div className="finance-container">
      <h1>Resumen Financiero</h1>
      
      <div className="summary-cards">
        <Card className="finance-card income">
          <DollarOutlined />
          <h3>Ingresos</h3>
          <p>${incomeTotal.toLocaleString()}</p>
          <div className="trend">
            <ArrowUpOutlined /> 12%
          </div>
        </Card>
        
        <Card className="finance-card expense">
          <DollarOutlined />
          <h3>Gastos</h3>
          <p>${expenseTotal.toLocaleString()}</p>
          <div className="trend">
            <ArrowDownOutlined /> 8%
          </div>
        </Card>
        
        <Card className="finance-card balance">
          <DollarOutlined />
          <h3>Balance</h3>
          <p>${balance.toLocaleString()}</p>
        </Card>
      </div>
      
      <div className="transactions-section">
        <div className="header">
          <h2>Transacciones Recientes</h2>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Nueva Transacción
          </Button>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={transactions} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
      
      <Modal
        title="Agregar Nueva Transacción"
        visible={isModalVisible}
        onOk={handleAddTransaction}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="form-group">
          <label>Fecha:</label>
          <DatePicker 
            style={{ width: '100%' }}
            onChange={(date, dateString) => setNewTransaction({...newTransaction, date: dateString})}
          />
        </div>
        
        <div className="form-group">
          <label>Descripción:</label>
          <Input 
            value={newTransaction.description}
            onChange={e => setNewTransaction({...newTransaction, description: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Tipo:</label>
          <Select
            style={{ width: '100%' }}
            value={newTransaction.type}
            onChange={value => setNewTransaction({...newTransaction, type: value})}
          >
            <Option value="income">Ingreso</Option>
            <Option value="expense">Gasto</Option>
          </Select>
        </div>
        
        <div className="form-group">
          <label>Categoría:</label>
          <Input 
            value={newTransaction.category}
            onChange={e => setNewTransaction({...newTransaction, category: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Monto:</label>
          <Input 
            type="number"
            value={newTransaction.amount}
            onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Finanzas4;
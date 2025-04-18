import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  MoneyOff as MoneyOffIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Estilos personalizados
const StyledCard = styled(Card)(({ theme, cardtype }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
  backgroundColor: 
    cardtype === 'income' ? 'rgba(76, 175, 80, 0.1)' :
    cardtype === 'expense' ? 'rgba(244, 67, 54, 0.1)' :
    cardtype === 'balance' ? 'rgba(33, 150, 243, 0.1)' : 'inherit',
  borderLeft: 
    cardtype === 'income' ? '5px solid #4CAF50' :
    cardtype === 'expense' ? '5px solid #F44336' :
    cardtype === 'balance' ? '5px solid #2196F3' : 'none',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
}));

// Datos de ejemplo
const generateTransactions = () => {
  const transactions = [];
  const types = ['Ingreso', 'Gasto'];
  const categories = {
    'Ingreso': ['Ventas', 'Servicios', 'Inversiones', 'Otros'],
    'Gasto': ['Materiales', 'Salarios', 'Alquiler', 'Servicios', 'Marketing', 'Otros']
  };
  const descriptions = {
    'Ventas': ['Venta de productos', 'Venta mayorista', 'Venta minorista'],
    'Servicios': ['Consultoría', 'Mantenimiento', 'Soporte técnico'],
    'Inversiones': ['Dividendos', 'Intereses', 'Retorno de inversión'],
    'Materiales': ['Compra de inventario', 'Materias primas', 'Suministros'],
    'Salarios': ['Nómina mensual', 'Bonificaciones', 'Horas extras'],
    'Alquiler': ['Alquiler de oficina', 'Alquiler de equipos'],
    'Marketing': ['Campaña publicitaria', 'Eventos promocionales'],
    'Otros': ['Transacción miscelánea', 'Otros conceptos']
  };

  // Generar fechas de los últimos 30 días
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date;
  });

  // Generar transacciones aleatorias
  for (let i = 0; i < 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[type][Math.floor(Math.random() * categories[type].length)];
    const descOptions = descriptions[category] || descriptions['Otros'];
    const description = descOptions[Math.floor(Math.random() * descOptions.length)];
    const amount = type === 'Ingreso' 
      ? Math.floor(Math.random() * 10000) + 1000 
      : -(Math.floor(Math.random() * 5000) + 500);
    const date = dates[Math.floor(Math.random() * dates.length)];
    
    transactions.push({
      id: i + 1,
      date,
      type,
      category,
      description,
      amount,
      status: Math.random() > 0.2 ? 'Completado' : 'Pendiente'
    });
  }

  return transactions.sort((a, b) => b.date - a.date);
};

const Finanzas3 = () => {
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'Ingreso',
    category: '',
    description: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'Completado'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  // Cargar datos al iniciar
  useEffect(() => {
    const data = generateTransactions();
    setTransactions(data);
  }, []);

  // Calcular totales
  const totalIncome = transactions
    .filter(t => t.type === 'Ingreso')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'Gasto')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome + totalExpense;

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);
    
    const matchesFilter = 
      filterType === 'Todos' || 
      transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Manejar apertura del diálogo
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Manejar cierre del diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Validar que todos los campos estén completos
    if (!newTransaction.category || !newTransaction.description || !newTransaction.amount || !newTransaction.date) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Crear nueva transacción
    const transaction = {
      id: transactions.length + 1,
      date: new Date(newTransaction.date),
      type: newTransaction.type,
      category: newTransaction.category,
      description: newTransaction.description,
      amount: newTransaction.type === 'Ingreso' 
        ? Math.abs(parseFloat(newTransaction.amount)) 
        : -Math.abs(parseFloat(newTransaction.amount)),
      status: newTransaction.status
    };

    // Actualizar estado
    setTransactions([transaction, ...transactions]);
    
    // Cerrar diálogo y resetear formulario
    handleCloseDialog();
    setNewTransaction({
      type: 'Ingreso',
      category: '',
      description: '',
      amount: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'Completado'
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Resumen Financiero
      </Typography>

      {/* Tarjetas de resumen */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StyledCard cardtype="income">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <IconContainer sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)' }}>
                    <AttachMoneyIcon sx={{ fontSize: 30, color: '#4CAF50' }} />
                  </IconContainer>
                  <Typography variant="h6" component="div">
                    Ingresos Totales
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
                    ${totalIncome.toLocaleString('es-ES')}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUpIcon sx={{ color: '#4CAF50', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      +5.3% respecto al mes anterior
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard cardtype="expense">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <IconContainer sx={{ bgcolor: 'rgba(244, 67, 54, 0.2)' }}>
                    <MoneyOffIcon sx={{ fontSize: 30, color: '#F44336' }} />
                  </IconContainer>
                  <Typography variant="h6" component="div">
                    Gastos Totales
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
                    ${Math.abs(totalExpense).toLocaleString('es-ES')}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingDownIcon sx={{ color: '#F44336', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      +2.7% respecto al mes anterior
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard cardtype="balance">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <IconContainer sx={{ bgcolor: 'rgba(33, 150, 243, 0.2)' }}>
                    <AccountBalanceIcon sx={{ fontSize: 30, color: '#2196F3' }} />
                  </IconContainer>
                  <Typography variant="h6" component="div">
                    Balance Actual
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
                    ${balance.toLocaleString('es-ES')}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {balance > 0 ? (
                      <>
                        <TrendingUpIcon sx={{ color: '#4CAF50', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          Situación financiera positiva
                        </Typography>
                      </>
                    ) : (
                      <>
                        <TrendingDownIcon sx={{ color: '#F44336', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          Situación financiera negativa
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Controles de tabla */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Transacciones Recientes
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ 
            bgcolor: '#2196F3', 
            '&:hover': { bgcolor: '#1976D2' },
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          Nueva Transacción
        </Button>
      </Box>

      {/* Filtros */}
      <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
        <TextField
          placeholder="Buscar transacción..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="filter-type-label">Tipo</InputLabel>
          <Select
            labelId="filter-type-label"
            id="filter-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Tipo"
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Ingreso">Ingresos</MenuItem>
            <MenuItem value="Gasto">Gastos</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabla de transacciones */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Categoría</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Monto</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    hover
                    sx={{ 
                      '&:nth-of-type(odd)': { bgcolor: 'rgba(0, 0, 0, 0.02)' },
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.08)' }
                    }}
                  >
                    <TableCell>
                      {format(transaction.date, 'dd MMM yyyy', { locale: es })}
                    </TableCell>
                    <TableCell>
                      <Box 
                        component="span" 
                        sx={{ 
                          display: 'inline-block',
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: '4px', 
                          bgcolor: transaction.type === 'Ingreso' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                          color: transaction.type === 'Ingreso' ? '#388E3C' : '#D32F2F',
                          fontWeight: 'medium',
                          fontSize: '0.875rem'
                        }}
                      >
                        {transaction.type}
                      </Box>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell sx={{ 
                      color: transaction.amount > 0 ? '#388E3C' : '#D32F2F',
                      fontWeight: 'medium'
                    }}>
                      {transaction.amount > 0 ? '+' : ''}
                      ${Math.abs(transaction.amount).toLocaleString('es-ES')}
                    </TableCell>
                    <TableCell>
                      <Box 
                        component="span" 
                        sx={{ 
                          display: 'inline-block',
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: '4px', 
                          bgcolor: transaction.status === 'Completado' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                          color: transaction.status === 'Completado' ? '#388E3C' : '#F57C00',
                          fontWeight: 'medium',
                          fontSize: '0.875rem'
                        }}
                      >
                        {transaction.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron transacciones
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>

      {/* Diálogo para nueva transacción */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196F3', color: 'white', fontWeight: 'bold' }}>
          Nueva Transacción
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-label">Tipo</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  label="Tipo"
                >
                  <MenuItem value="Ingreso">Ingreso</MenuItem>
                  <MenuItem value="Gasto">Gasto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={newTransaction.category}
                  onChange={handleInputChange}
                  label="Categoría"
                >
                  {newTransaction.type === 'Ingreso' ? (
                    <>
                      <MenuItem value="Ventas">Ventas</MenuItem>
                      <MenuItem value="Servicios">Servicios</MenuItem>
                      <MenuItem value="Inversiones">Inversiones</MenuItem>
                      <MenuItem value="Otros">Otros</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value="Materiales">Materiales</MenuItem>
                      <MenuItem value="Salarios">Salarios</MenuItem>
                      <MenuItem value="Alquiler">Alquiler</MenuItem>
                      <MenuItem value="Servicios">Servicios</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Otros">Otros</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                name="description"
                value={newTransaction.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Monto"
                name="amount"
                type="number"
                value={newTransaction.amount}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Fecha"
                name="date"
                type="date"
                value={newTransaction.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Estado</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={newTransaction.status}
                  onChange={handleInputChange}
                  label="Estado"
                >
                  <MenuItem value="Completado">Completado</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ 
              bgcolor: '#2196F3', 
              '&:hover': { bgcolor: '#1976D2' },
              borderRadius: '8px'
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Finanzas3;
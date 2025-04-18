import React from 'react';
// Import routing components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Removed: import EdicionPlannings from './pages/EdicionPlannings';
// Removed finance component imports
// import Finanzas1 from './pages/Finanzas1';
// import Finanzas2 from './pages/Finanzas2';
// import Finanzas3 from './pages/finanzas3';
// import Finanzas4 from './pages/finanzas4';

// Import the routine editor pages
import PaginadeEdicionDeRutinas from './pages/paginadeedicionderutinas'; // Ensure the path is correct
// Assuming the other pages follow a similar naming convention and path
import PaginadeEdicionDeRutinas2 from './pages/paginadeedicionderutinas2'; // Import the second page
import PaginaDeEdicionDeRutinas3 from './pages/PaginadeEdicionDeRutinas3.jsx'; // or .jsx// Import the third page (assuming name)
import PaginadeEdicionDeRutinas4 from './pages/PaginadeEdicionDeRutinas4.jsx'; // Import the fourth page (assuming name)


// Import Ant Design CSS - needed for PaginadeEdicionDeRutinas
import 'antd/dist/reset.css';

function App() {
  return (
    // Wrap the application with Router
    <Router>
      {/* Define the routes */}
      <Routes>
        {/* Route for the first page */}
        <Route path="/pagina1" element={<PaginadeEdicionDeRutinas />} />
        {/* Route for the second page */}
        <Route path="/pagina2" element={<PaginadeEdicionDeRutinas2 />} />
        {/* Route for the third page (uncomment if PaginadeEdicionDeRutinas3 exists) */}
        <Route path="/pagina3" element={<PaginadeEdicionDeRutinas3 />} /> 
        {/* Route for the fourth page (uncomment if PaginadeEdicionDeRutinas4 exists) */}
       <Route path="/pagina4" element={<PaginadeEdicionDeRutinas4 />} /> 
        {/* Optional: Default route (e.g., redirect to pagina1 or show a homepage) */}
        <Route path="/" element={<PaginadeEdicionDeRutinas />} /> {/* Example: Default to pagina1 */}
      </Routes>
    </Router>
  );
}

export default App;
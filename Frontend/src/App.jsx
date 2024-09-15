import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/navbar.jsx';
import ProductSearchPage from './pages/ProductSearchPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import UsersPage from './pages/userPage.jsx';
import UserDetails from './pages/userDetails.jsx';  

function App() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  return (
    <Router>
      <div className="app">
        <NavbarComponent show={showOffcanvas} handleShow={handleShow} handleClose={handleClose} />
        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/search-product" element={<ProductSearchPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user-details/:id" element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

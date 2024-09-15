import PropTypes from 'prop-types';
import { Navbar, Container, Button, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = ({ show, handleShow, handleClose }) => (
  <>
    <Navbar className="text-light">
      <Container fluid>
        <Button className='btn btn-dark' onClick={handleShow}>
          <i className="bi bi-list"></i> Menú
        </Button>
      </Container>
    </Navbar>

    <Offcanvas show={show} onHide={handleClose} className="text-light" id="menuOffCanvas">
      <Offcanvas.Header closeButton className="text-light">
        <Offcanvas.Title>Dashboard</Offcanvas.Title>
      </Offcanvas.Header >
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" className="text-light" onClick={handleClose}>Inicio</Nav.Link>
          <Nav.Link as={Link} to="/search-product" className="text-light" onClick={handleClose}>Productos</Nav.Link>
          <Nav.Link as={Link} to="/users" className="text-light" onClick={handleClose}>Usuarios</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  </>
);

NavbarComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NavbarComponent;

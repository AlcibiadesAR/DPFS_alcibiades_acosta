import { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ProductSearchPage = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
      setProduct(response.data);
      setError('');
    } catch {
      setProduct(null);
      setError('Producto no encontrado');
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={10} >
          <h1 className="text-center mb-4 text-light">Buscar Producto por ID</h1>
          <Form className="md-4">
            <Form.Group className="mb-4">
              <Form.Label id='formLabel'>ID del Producto</Form.Label>
              <Form.Control
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Ingrese el ID del producto"
                class
              />
            </Form.Group>
            <Button variant="secondary mb-10" onClick={handleSearch}>Buscar</Button>
          </Form>

          {error && <p className="text-danger mt-3">{error}</p>}

          {product && (
            <div className="mt-4">
              <h3 className='text-light'>Detalles del Producto</h3>
              <Table striped bordered hover responsive>
                <tbody>
                  <tr>
                    <td><strong>Nombre</strong></td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Imagen</strong></td>
                    <td><img src={product.images} alt={product.name} style={{ width: '150px' }} /></td>
                  </tr>
                  <tr>
                    <td><strong>Categoría</strong></td>
                    <td>{product.category || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Precio</strong></td>
                    <td>{product.price}</td>
                  </tr>
                  <tr>
                    <td><strong>Descripción</strong></td>
                    <td>{product.description}</td>
                  </tr>
                  <tr>
                    <td><strong>Color</strong></td>
                    <td>{product.color}</td>
                  </tr>
                  <tr>
                    <td><strong>Marca</strong></td>
                    <td>{product.brand}</td>
                  </tr>
                  <tr>
                    <td><strong>Modelo</strong></td>
                    <td>{product.model}</td>
                  </tr>
                  <tr>
                    <td><strong>Caja</strong></td>
                    <td>{product.box}</td>
                  </tr>
                  <tr>
                    <td><strong>Dial</strong></td>
                    <td>{product.dial}</td>
                  </tr>
                  <tr>
                    <td><strong>Movimiento</strong></td>
                    <td>{product.movement}</td>
                  </tr>
                  <tr>
                    <td><strong>Banda</strong></td>
                    <td>{product.band}</td>
                  </tr>
                  <tr>
                    <td><strong>Resistencia al Agua</strong></td>
                    <td>{product.waterResistance}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSearchPage;

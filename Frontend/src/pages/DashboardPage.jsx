import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductPanel from '../components/productPanel.jsx';
import CategoryPanel from '../components/categoryPanel.jsx';
import ProductList from '../components/productList.jsx';
import { Container, Row, Col } from 'react-bootstrap';

const DashboardPage = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState([]);
  const [latestProduct, setLatestProduct] = useState(null); // Para el último producto
  const [productsList, setProductsList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products?page=${currentPage}&limit=10`);
        const { products, countByCategory, next, previous, count } = response.data;
        
        setCategoriesCount(countByCategory);
        setProductsList(products);
        setNextPage(next);
        setPrevPage(previous);
        setTotalProducts(count); 

        if (next) {
          const url = new URL(next);
          const page = url.searchParams.get('page');
          setTotalPages(page ? parseInt(page) : 1);
        }
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    const fetchLatestProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/lastProduct');  // Petición al último producto
        setLatestProduct(response.data);  // Almacena el último producto
      } catch (error) {
        console.error('Error fetching latest product:', error);
      }
    };

    fetchProducts();
    fetchLatestProduct();  // Llama a la función para obtener el último producto

    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        const { count } = response.data;
        setUsersCount(count);
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="d-flex">
      <div className="main-content p-4" id="mainContainer">
        <Container fluid>
          <h1 className="text-center text-light">Dashboard</h1>
          <Row className="mt-4">
            
            <Col xs={11} md={5} lg={4} className="mb-4">
              <div className="dashboard-panel text-center p-4 text-light bg-secondary">
                <h3>Total de productos</h3>
                <p>{totalProducts}</p>
              </div>
            </Col>
  
            <Col xs={11} md={6} lg={4} className="mb-4">
              <div className="dashboard-panel text-center p-4 text-light bg-success">
                <h3>Total de usuarios</h3>
                <p>{usersCount}</p>
              </div>
            </Col>

            <Col xs={11} lg={4} className="mb-4">
              <div className="dashboard-panel text-center p-4 text-light bg-primary">
                <h3>Total de categorías</h3>
                <p>{categoriesCount.length}</p>
              </div>
            </Col>
  
            <Col xs={11} lg={4} className="mb-4">
              <ProductPanel latestProduct={latestProduct} /> {/* Panel del último producto */}
            </Col>
            
            <Col xs={11} lg={8}>
              <CategoryPanel categoriesCount={categoriesCount} />
            </Col>

            <Col xs={11} lg={12} className="mt-8">
              <ProductList 
                productsList={productsList} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePageChange={handlePageChange} 
                nextPage={nextPage} 
                prevPage={prevPage} 
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DashboardPage;

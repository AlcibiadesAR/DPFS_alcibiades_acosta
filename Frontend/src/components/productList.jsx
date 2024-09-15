import PropTypes from 'prop-types';
import { Table, Pagination } from 'react-bootstrap';

const ProductList = ({ productsList, currentPage, totalPages, handlePageChange, nextPage, prevPage }) => (
  <div className="text-light">
    <h3>Listado de productos</h3>
      <Table striped bordered hover variant='secondary' className="w-100 table-striped" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((product, index) => (
            <tr key={product.id}>
              <td>{(currentPage - 1) * 10 + (index + 1)}</td>
              <td>{product.name}</td>
              <td>{product.category || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    <Pagination className="mt-4">
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={!prevPage} />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={!nextPage} />
    </Pagination>
  </div>
);


ProductList.propTypes = {
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  nextPage: PropTypes.string,
  prevPage: PropTypes.string,
};

export default ProductList;

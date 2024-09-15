import PropTypes from 'prop-types';

const ProductPanel = ({ latestProduct }) => (
  <div className="dashboard-panel p-4 text-light bg-danger mb-12">
    <h3 className='text-center mb-10'>Último producto creado</h3>
    {latestProduct ? (
      <ul>
        <li>Nombre: {latestProduct.name}</li>
        <li>Categoría: {latestProduct.category || 'N/A'}</li>
        <li>Precio: {latestProduct.price}</li>
      </ul>
    ) : (
      <p>No hay productos disponibles</p>
    )}
  </div>
);


ProductPanel.propTypes = {
  latestProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    price: PropTypes.number.isRequired,
  }),
};

export default ProductPanel;

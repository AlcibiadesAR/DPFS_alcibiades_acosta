import PropTypes from 'prop-types';

const CategoryPanel = ({ categoriesCount }) => (
  <div className="dashboard-panel p-8 text-light bg-warning">
    <h3 className='text-center'>Categorías y total de productos</h3>
    <ul>
      {categoriesCount.map((category, index) => (
        <li key={index}>{category.category}: {category.count} productos</li>
      ))}
    </ul>
  </div>
);

CategoryPanel.propTypes = {
  categoriesCount: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryPanel;

import { useProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
  const { filteredProducts, searchQuery } = useProductContext();

  return (
    <div className="container mt-4">
      <h4 className="mb-3">
        Search Results for <em>"{searchQuery}"</em>
      </h4>

      {filteredProducts.length === 0 ? (
        <p className="text-muted">No products match your search.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 d-flex" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

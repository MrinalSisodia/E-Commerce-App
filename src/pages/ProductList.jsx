import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const { category } = useParams();
  const { setCategory, filteredProducts, categoryLoading } = useProductContext();

  useEffect(() => {
    setCategory(category);
  }, [category, setCategory]);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 text-capitalize">{category} Products</h2>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <FiltersSidebar />
        </div>

        {/* Product Grid */}
        <div className="col-md-9">
          {categoryLoading ? (
            <p className="text-muted">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-muted">No products found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
  {filteredProducts.map((product) => (
    <div className="col d-flex" key={product._id}>
      <div className="w-100">
        <ProductCard product={product} />
      </div>
    </div>
  ))}
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

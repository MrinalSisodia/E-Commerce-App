import React from "react";
import { useProductContext } from "../context/ProductContext";

const FiltersSidebar = () => {
  const {
    subCategory,
    setSubcategory,
    availableSubcategories,
    rating,
    setRating,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    clearFilters,
  } = useProductContext();

   return (
    <div className="border p-3 rounded">
      {/* Filters Header + Clear Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filters</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

     

      {/* Subcategory */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Subcategory</label>
        <div className="d-flex flex-column">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="subcategory"
              id="sub-all"
              value="All"
              checked={subCategory === 'All'}
              onChange={() => setSubcategory('All')}
            />
            <label className="form-check-label" htmlFor="sub-all">All</label>
          </div>
          {(availableSubcategories || []).map((sub) => (
            <div key={sub} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="subcategory"
                id={`sub-${sub}`}
                value={sub}
                checked={subCategory === sub}
                onChange={() => setSubcategory(sub)}
              />
              <label className="form-check-label" htmlFor={`sub-${sub}`}>
                {sub}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      {/* Rating Slider */}
<div className="mb-3">
  <label className="form-label fw-semibold">
    Rating: {rating} ⭐ & above
  </label>
  <input
    type="range"
    className="form-range"
    min="1"
    max="4"
    step="1"
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
  />
</div>


    {/* Price */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Price: ${maxPrice}</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="300"
          step="30"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      {/* Sort By Price */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Sort by Price</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="low-to-high"
            value="lowToHigh"
            checked={sortBy === "lowToHigh"}
            onChange={() => setSortBy("lowToHigh")}
          />
          <label className="form-check-label" htmlFor="low-to-high">
            Low to High
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="high-to-low"
            value="highToLow"
            checked={sortBy === "highToLow"}
            onChange={() => setSortBy("highToLow")}
          />
          <label className="form-check-label" htmlFor="high-to-low">
            High to Low
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
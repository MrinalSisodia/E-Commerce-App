import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";

export default function Navbar() {
  const { searchQuery, setSearchQuery, setTriggerSearch } = useProductContext();
  const navigate = useNavigate();
  const location = useLocation();

const handleSearchClick = () => {
  if (searchQuery.trim()) {
    setTriggerSearch(true); 
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  }
};

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchQuery("");
    }
  }, [location.pathname, setSearchQuery]);

  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyShoppingWebsite
        </Link>

        <div className="mx-auto" style={{ width: "25%" }}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearchClick}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <Link to="/wishlist" className="text-dark text-decoration-none">
            <i className="bi bi-heart fs-5"></i>
          </Link>
          <Link to="/cart" className="text-dark text-decoration-none">
            <i className="bi bi-cart fs-5"></i>
          </Link>
          <Link to="/user-profile" className="text-dark text-decoration-none">
            <i className="bi bi-person fs-5"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { toast } from "react-toastify";
import { signOut,onAuthStateChanged } from "firebase/auth";
import { auth  } from "../Services/firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
  signOut(auth)
    .then(() => {
      toast.info("Logged out successfully");
      navigate("/");
    })
    .catch((error) => toast.error(error.message));
};

  // Fetch products from DummyJSON
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Searchbar
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortOption) {
    case "price-asc":
      return a.price - b.price;
    case "price-desc":
      return b.price - a.price;
    case "rating-asc":
      return a.rating - b.rating;
    case "rating-desc":
      return b.rating - a.rating;
    case "name-asc":
      return a.title.localeCompare(b.title);
    case "name-desc":
      return b.title.localeCompare(a.title);
    default:
      return 0;
  }
});

  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark glassy-nav px-4">
        <a className="navbar-brand fw-bold" href="#">
          Product Viewer
        </a>
        <form
          className="d-flex mx-auto search-bar"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-light rounded-pill" type="submit">
            Search
          </button>
        </form>
        <span className="text-light small">{userEmail}</span>
        <div className="ms-auto">
          <button className="btn btn-danger rounded-pill" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="hero-section text-center text-white py-5">
        <h1 className="fw-bold display-4">Welcome to the Future of Shopping</h1>
        <p className="lead">Explore premium products with a next-gen experience</p>
      </section>
      <div style={{paddingLeft:'70%',paddingTop:'40px',paddingRight:'17%'}}>
        <select
                    className="form-select ms-3 rounded-pill"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    >
                    <option value="">Sort By(ALL)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
      </div>
      {/* Products Grid */}
      <div className="container mt-5">
        <div className="row g-4">
          {sortedProducts.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="card futuristic-card h-100 shadow-sm">
                <div className="card-img-container">
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ₹{product.price}</p>
                  <p className="card-text">Rating: ⭐{product.rating}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

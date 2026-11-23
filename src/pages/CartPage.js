import React, { useEffect, useState } from 'react';
import { SiGoogleplay } from 'react-icons/si';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaPlus,
  FaMinus,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaApple,
  FaTrash,
  FaArrowLeft,
  FaFeather,
} from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  //  Fetch products from your API
  useEffect(() => {
    fetch('http://157.230.240.97:9999/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        const updatedItems = data.data.map(item => ({
          id: item.id || item._id || item.slug || item.name, // fallback for id
          name: item.name,
          color: item.color || 'Default',
          size: item.size || 'One Size',
          price: item.price,
          originalPrice: item.original_price || item.price + 500, // fallback logic
          quantity: 1,
          image: item.thumb || item.image || 'https://via.placeholder.com/120',
          selected: true,
        }));
        setCartItems(updatedItems);
      })
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleItemSelection = id => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: newSelectAll }))
    );
  };

  const clearAll = () => {
    setCartItems([]);
    setSelectAll(false);
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <header>
        <div className="bg-dark text-white py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold fs-5">
                <FaFeather size={24} />
                FALCON
              </span>
            </div>

            <div className="flex-grow-1 mx-4" style={{ maxWidth: 400 }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for anything..."
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    paddingRight: '2.5rem',
                  }}
                />
                <button
                  className="btn"
                  style={{ backgroundColor: '#00b795', color: 'white' }}
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 position-relative">
              <FaShoppingCart size={24} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{
                  fontSize: '0.7rem',
                  width: '1.25rem',
                  height: '1.25rem',
                  padding: 0,
                }}
              >
                {cartItems.length}
              </span>
              <FaUser size={24} />
            </div>
          </div>

          <nav className="bg-secondary py-2 mt-2">
            <div className="container d-flex justify-content-between text-white small">
              <div className="d-flex gap-4">
                {[
                  'Categories',
                  'Electronics',
                  'Home Appliances',
                  'Mother & Baby',
                  'Automotive',
                  'Sports Gear',
                ].map(cat => (
                  <span key={cat}>{cat}</span>
                ))}
              </div>
              <div className="d-flex gap-3 small">
                {['TRACK ORDER', 'HELP CENTER', 'SELL WITH US'].map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </nav>

          <div className="bg-light text-secondary py-2">
            <div className="container d-flex gap-2 small">
              <a
                href="/"
                className="text-decoration-none text-secondary"
                style={{ color: '#00b795' }}
              >
                Home
              </a>
              <span>&gt;</span>
              <span>My Cart</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="mb-3">
          <a
            href="/"
            className="btn btn-link text-secondary d-inline-flex align-items-center"
          >
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </a>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="h4 fw-bold text-dark">
                    My Cart ({cartItems.length})
                  </h1>
                  <div className="d-flex gap-3 align-items-center">
                    <button
                      className="btn btn-outline-secondary d-flex align-items-center"
                      onClick={toggleSelectAll}
                    >
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="me-2"
                      />
                      Select All
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={clearAll}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-5 text-secondary">
                    <FaShoppingCart size={64} className="mb-3" />
                    <h3>Your cart is empty</h3>
                    <p>Add some items to get started</p>
                    <a href="/" className="btn btn-success">
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {cartItems.map(item => (
                      <div
                        key={item.id}
                        className="d-flex border rounded p-3 align-items-start gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleItemSelection(item.id)}
                          className="mt-2"
                        />
                        <img
                          src={item.image || 'https://via.placeholder.com/120'}
                          alt={item.name}
                          width={120}
                          height={120}
                          style={{
                            objectFit: 'cover',
                            borderRadius: '0.375rem',
                          }}
                        />
                        <div className="flex-grow-1 d-flex flex-column justify-content-between">
                          <div>
                            <h3 className="h6 fw-bold text-dark">
                              {item.name}
                            </h3>
                            <div className="text-muted small mb-2">
                              Color: {item.color}{' '}
                              <span className="mx-2">•</span> Size: {item.size}
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center gap-2">
                                <button
                                  className="btn btn-outline-secondary btn-sm p-1"

                                >
                                  <FaMinus />
                                </button>
                                <span
                                  className="fw-medium text-center"
                                  style={{ minWidth: '30px' }}
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  className="btn btn-outline-secondary btn-sm p-1"

                                >
                                  <FaPlus />
                                </button>
                              </div>

                              <button
                                className="btn btn-link text-danger"

                              >
                                <FaTrash className="me-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold fs-5 text-dark">
                              ₹{item.price}
                            </div>
                            <div className="text-muted text-decoration-line-through">
                              ₹{item.originalPrice}
                            </div>
                            <div className="text-success small fw-medium mt-1">
                              {Math.round(
                                ((item.originalPrice - item.price) /
                                  item.originalPrice) *
                                  100
                              )}
                              % off
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card shadow-sm position-sticky"
              style={{ top: '1.5rem' }}
            >
              <div className="card-body">
                <h2 className="h5 fw-bold text-dark mb-4">Order Summary</h2>
                <div className="mb-4">
                  <div className="d-flex justify-content-between text-muted mb-2">
                    <span>Items ({totalItems})</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between text-muted mb-2">
                    <span>Shipping</span>
                    <span className="text-success fw-medium">Free</span>
                  </div>
                  <div className="d-flex justify-content-between text-muted mb-2">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold fs-5 text-dark">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  className="btn btn-success w-100 py-2"
                  disabled={selectedItems.length === 0}
                >
                  Proceed to Checkout ({selectedItems.length})
                </button>

                <div className="mt-3 p-3 bg-light rounded">
                  <div className="form-check d-flex align-items-center gap-2 text-muted small">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                    />
                    <label htmlFor="terms" className="form-check-label">
                      I have read and agree to the Terms and Conditions, Privacy
                      Policy and Returns Policy.
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="h6 fw-medium text-dark mb-2">
                    Have a promo code?
                  </h3>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter promo code"
                    />
                    <button className="btn btn-outline-success">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h5 className="d-flex align-items-center gap-2">
                <FaFeather size={24} />
                FALCON
              </h5>
              <p>
                Experience our new platform & Enjoy selling deals and offers on
                your day to day needs.
              </p>
              <p>House #64, Road 13, ASA Center, Uttara, Dhaka-1402</p>
              <p>01729-1497201</p>
              <p>falcon@gmail.com</p>
              <div className="d-flex gap-3">
                <FaFacebookF />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
            <div className="col-md-3">
              <h6>ABOUT</h6>
              <p>Contact Us</p>
              <p>About Us</p>
              <p>Careers</p>
              <p>Terms of Use</p>
            </div>
            <div className="col-md-3">
              <h6>HELP</h6>
              <p>Payments</p>
              <p>Shipping</p>
              <p>My Orders</p>
              <p>FAQs</p>
            </div>
            <div className="col-md-3 text-center">
              <h6>Need Support?</h6>
              <button className="btn btn-secondary mb-3 w-100">
                01729-781XXX
              </button>
              <h6>DOWNLOAD APP</h6>
              <button
                className="btn btn-dark btn-sm w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
                style={{
                  border: '1px solid #fff',
                  padding: '10px 10px',
                  background: 'black',
                  fontWeight: '600',
                  fontSize: '20px',
                  borderRadius: '10px',
                  marginBottom: '5px',
                }}
              >
                <SiGoogleplay size={30} />
                Google Play
              </button>
              <button
                className="btn btn-dark btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  border: '1px solid #fff',
                  padding: '10px 10px',
                  background: 'black',
                  fontWeight: '600',
                  fontSize: '20px',
                  borderRadius: '10px',
                }}
              >
                <FaApple size={30} />
                App Store
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SiGoogleplay } from 'react-icons/si';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaShareAlt,
  FaStar,
  FaPlus,
  FaMinus,
  FaTwitter,
  FaShippingFast,
  FaTruck,
  FaMoneyCheckAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaFacebookF,
  FaInstagram,
  FaApple,
  FaFeather,
} from 'react-icons/fa';

export default function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor] = useState('Navy Blue');
  const [quantity, setQuantity] = useState(2);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://157.230.240.97:9999/api/v1/categories')
      .then(res => {
        setCategories(res.data.data || []);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategories([]);
      });

    //  Fetch products from your API
    axios
      .get('http://157.230.240.97:9999/api/v1/product/iphone-15-plus')
      .then(res => {
        setProduct(res.data.data || res.data);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setProduct(null);
      });
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <h4 className="mb-0">
              {' '}
              <FaFeather size={24} />
              FALCON
            </h4>
          </div>
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search for anything..."
            />
            <button className="btn btn-success">
              <FaSearch />
            </button>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <FaShoppingCart size={24} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </div>
            <FaUser size={24} />
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <div className="navbar-nav me-auto">
            {categories.slice(0, 6).map(cat => (
              <button key={cat.id} className="nav-link btn btn-link p-0">
                {cat.name}
              </button>
            ))}
          </div>
          <div className="d-flex gap-3 small text-secondary">
            <span>TRACK ORDER</span>
            <span>HELP CENTER</span>
            <span>SELL WITH US</span>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container py-2 text-secondary small">
        Home &gt; Tags &gt; T-Shirts
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row g-4">
          {/* Product Section */}
          <div className="col-lg-9">
            <div className="row g-4">
              {/* Images */}
              <div className="col-md-6">
                <div className="bg-white p-3 rounded mb-3">
                  <img
                    src={
                      product?.thumbnail || 'https://via.placeholder.com/400'
                    }
                    className="img-fluid"
                    alt="Product"
                  />
                </div>
                <div className="d-flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="border border-success rounded p-1"
                      style={{ width: 60, height: 60 }}
                    >
                      <img
                        src={
                          product?.thumbnail || 'https://via.placeholder.com/60'
                        }
                        className="img-fluid"
                        alt={`Thumbnail ${i}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="col-md-6">
                <h5>
                  {product?.name ||
                    "Men's Stylish & Fashionable Trendy Good Looking Long Sleeve Casual Shirt."}
                </h5>
                <div className="d-flex align-items-center mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar key={star} color="#eab308" />
                  ))}
                  <span className="ms-2 text-secondary small">
                    {product?.rating_count || '2,254'}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <h4 className="me-3 text-dark">
                    ৳{product?.product_detail?.discount_price || '1139.33'}
                  </h4>
                  <del className="text-secondary">
                    ৳{product?.product_detail?.regular_price || '1639'}
                  </del>
                  <span className="badge bg-danger ms-2">Hot Sale! 30%</span>
                </div>

                <div className="border rounded p-3 mb-3">
                  <h6>Delivery Options</h6>
                  <div className="small text-success">
                    • Regular — Delivery within 2-3 days
                  </div>
                  <div className="small text-muted">• Free Delivery</div>
                </div>

                <h6>Available Color: {selectedColor}</h6>
                <div className="d-flex gap-2 mb-3">
                  <div
                    className="border border-success rounded"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#d6dce5',
                    }}
                  ></div>
                  <div
                    className="rounded"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#ef4444',
                    }}
                  ></div>
                  <div
                    className="rounded"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#1434cb',
                    }}
                  ></div>
                  <div
                    className="rounded"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#0f172a',
                    }}
                  ></div>
                </div>

                <h6>Select Size: {selectedSize}</h6>
                <div className="d-flex gap-2 mb-3">
                  {['XL', 'XS', 'S', 'L'].map(size => (
                    <button
                      key={size}
                      className={`btn ${
                        selectedSize === size
                          ? 'btn-success'
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <h6>Quantity</h6>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  className="btn btn-success w-100 mb-3"
                  onClick={() => {
                    const cartData = {
                      id: product?.id,
                      name: product?.name,
                      description: product?.description,
                      thumbnail: product?.thumbnail,
                      price: product?.product_detail?.discount_price,
                      size: selectedSize,
                      color: selectedColor,
                      quantity: quantity,
                    };
                    localStorage.setItem('cartItem', JSON.stringify(cartData));
                    navigate('/cart');
                  }}
                >
                  Add to Cart
                </button>

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary">
                    <FaHeart />
                  </button>
                  <button className="btn btn-outline-secondary">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            </div>

            {/* Description & Spec */}
            <div className="mt-5">
              <h5>Description</h5>
              <p className="text-secondary">
                {product?.description ||
                  'The iPhone 15 Plus features a stunning 6.7-inch Super Retina XDR display, powerful A17 Pro chip, and an advanced camera system See More'}
              </p>
              <h5>Specification</h5>
              <ul className="text-secondary">
                <li>6.7-inch Super Retina XDR display </li>
                <li>A17 Pro chip with 6-core GPU</li>
                <li>Pro camera system with 48MP Main camera</li>
                <li>Up to 29 hours video playback</li>
                <li>USB-C connector</li>
                <li>Face ID for secure authentication</li>
              </ul>
              <button className="btn text-dark btn-outline-warning rounded-pill px-4">
                See More
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-3">
            {/* Delivery Options Card */}
            <div className="border rounded p-4 mb-4 shadow-sm">
              <h5 className="mb-3">Delivery Options</h5>
              <div className="d-flex align-items-center mb-3">
                <FaShippingFast size={24} className="text-success me-3" />
                <div>
                  <strong>Express Delivery</strong>
                  <p className="mb-0 small text-muted">
                    Get it within 1-2 business days
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <FaTruck size={24} className="text-primary me-3" />
                <div>
                  <strong>Standard Delivery</strong>
                  <p className="mb-0 small text-muted">
                    Delivered in 3-5 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className="border rounded p-4 shadow-sm">
              <h5 className="mb-3">Payment Methods</h5>
              <div className="d-flex gap-3 align-items-center">
                <FaCcVisa size={36} className="text-primary" title="Visa" />
                <FaCcMastercard
                  size={36}
                  className="text-danger"
                  title="MasterCard"
                />
                <FaCcPaypal size={36} className="text-info" title="Paypal" />
                <FaMoneyCheckAlt
                  size={36}
                  className="text-success"
                  title="Cash on Delivery"
                />
              </div>
              <p className="mt-3 small text-muted">
                Secure payment options available. Choose what suits you best!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
              <p>House #64, Road 13, Dhaka</p>
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
}

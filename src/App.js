import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetailsPage';
import Cart from './pages/CartPage';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

// import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;

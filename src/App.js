import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Home from './pages/home';
import Product from './pages/productpage';
import Account from './pages/account';
import CategoryPage from './pages/categories';
import Viewpro from './components/viewproduct';
import Cart from './pages/cart';
import NotFound from './pages/NotFound';
import Checkoutpage from './components/checkoutpage';
import Categories from './components/categoriesview';
import Wishlistpage from './pages/wishlistpage';
import Footer from './components/footer';
import Login from './components/login';
import { WishlistProvider } from './components/wishlistcontext'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <WishlistProvider> 
        {/* Conditionally render Header and Footer based on the current path */}
        <ConditionalHeader />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/productpage' element={<Product />} />
          <Route path='/category/:id/productpage/:id' element={<Viewpro />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/category/:id' element={<Categories />} />
          <Route path='/wishlistpage' element={<Wishlistpage />} />
          <Route path='/category/:category_id/productpage/:id/checkout/:price' element={<Checkoutpage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ConditionalFooter />
      </WishlistProvider>
    </Router>
  );
}

// Component to conditionally render Header and Footer
const ConditionalHeader = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}
    </>
  );
}; const ConditionalFooter = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Footer />}
    </>
  );
};

export default App;

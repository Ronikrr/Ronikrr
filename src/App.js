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
import { WishlistProvider } from './components/wishlistcontext'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <WishlistProvider> 
        <Header />
    
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/productpage' element={<Product />} />
          <Route path='/category/:id/productpage/:id' element={<Viewpro />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:id" element={<Categories />} /> {/* Fixed route */}
          <Route path='/wishlistpage' element={<Wishlistpage />} />
          <Route path='/category/:category_id/productpage/:id/checkout/:price' element={<Checkoutpage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </WishlistProvider>
    </Router>
  );
}

export default App;

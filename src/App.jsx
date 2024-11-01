import './styles/main.scss';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';

// pages
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import SinglePost from './pages/Blog/SinglePost/SinglePost';
import Archive from './pages/Blog/Archive/Archive';
import GalleryCategoryList from './pages/Blog/GalleryCategoryList/GalleryCategoryList';
import GalleryCategoryPage from './pages/Blog/GalleryCategoryPage/GalleryCategoryPage';

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    /*
    if (!location.pathname.includes('/gallery-category')) {
      window.scrollTo(0, 0);
    }*/
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
        <Helmet>
          <title>My Travel Blog</title>
          <meta name="description" content="Explore the world from my perspective." />
          <meta name="keywords" content="Travel, Blog" />
          <meta name="author" content="Aljoša Renčof" />
        </Helmet>
        <ScrollToTopOnRouteChange />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/gallery" element={<Archive />} />
          <Route path="/gallery/:id" element={<SinglePost />} />

          <Route path="/gallery-categories" element={<GalleryCategoryList />} />
          <Route path="/gallery-category/:categoryId" element={<GalleryCategoryPage />} />
        </Routes>
        <Footer />
        <BackToTop />
    </BrowserRouter>
  );
}

export default App;

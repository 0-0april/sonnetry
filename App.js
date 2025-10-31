import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShortStories from './pages/ShortStories';
import Poetries from './pages/Poetries';
import About from './pages/About';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';
import WriterLogin from './pages/WriterLogin';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/writer-login-page';

  return (
    <div className="App">
      {!hideLayout && <Header />}
      {!hideLayout && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/short-stories" element={<ShortStories />} />
          <Route path="/poetries" element={<Poetries />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/writer-login-page" element={<WriterLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

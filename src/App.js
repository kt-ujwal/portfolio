import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async'; 

import Home         from './pages/Home';
import About        from './pages/About';
import Projects     from './pages/Projects';
import ProjectsList from './pages/ProjectsList';

import Footer       from './component/Footer';
import ScrollToTop  from  './utils/ScrollToTop';

function App() {

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  return (
    <div className="App">
       <HelmetProvider>
      <BrowserRouter>
      <ScrollToTop />  
        <Routes>
          <Route index          element={<Home />} />

          <Route path="about"           element={<About />} />
          <Route path="projects"        element={<Projects />} />
          <Route path="projects/list"   element={<ProjectsList />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;

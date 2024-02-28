import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Headers from './components/Headers';
import Footer from './components/Footer';
import HomeCenter from './HomeCenter';
import About from './Screens/About/About';
import Contact from './Screens/Contact/Contact';
import Blog from './Screens/Blog/BlogHomeScreen';
import ArtworksHomeScreen from './Screens/Artworks/ArtworksHomeScreen';
import ArtworksPageScreen from './Screens/Artworks/ArtworksPageScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <div className="w-full absolute z-10 justify-center ">
          <Headers />
        </div>
        <div className="">
          <Routes>
            <Route path="/*" element={<HomeCenter />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artworks" element={<ArtworksHomeScreen />} />
            <Route path="/artworks/:slug" element={<ArtworksPageScreen />} />
          </Routes>
        </div>
        <div className=" bottom-0">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider.jsx';
import Preloader from './components/Preloader/Preloader.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import CollectionCarousel from './components/CollectionCarousel/CollectionCarousel.jsx';
import Pillars from './components/Pillars/Pillars.jsx';
import ProductFeature from './components/ProductFeature/ProductFeature.jsx';
import StoreExperience from './components/StoreExperience/StoreExperience.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScrollProvider>
      <Preloader onReveal={() => setReady(true)} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <CollectionCarousel />
        <Pillars />
        <ProductFeature />
        <StoreExperience />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}

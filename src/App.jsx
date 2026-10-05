import { SmoothScrollProvider } from './providers/SmoothScrollProvider.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import CollectionCarousel from './components/CollectionCarousel/CollectionCarousel.jsx';
import Pillars from './components/Pillars/Pillars.jsx';
import ProductFeature from './components/ProductFeature/ProductFeature.jsx';
import StoreExperience from './components/StoreExperience/StoreExperience.jsx';

export default function App() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <Hero />
        <CollectionCarousel />
        <Pillars />
        <ProductFeature />
        <StoreExperience />
      </main>
    </SmoothScrollProvider>
  );
}

import React from 'react';
import Hero from '../components/home/hero';
import Services from '../components/home/services';
import About from '../components/home/about';

const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <About />
      <Services />
    </div>
  );
};

export default Home;
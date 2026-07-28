import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
};

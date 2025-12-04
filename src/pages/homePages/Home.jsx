import React from 'react';
import HeroSection from '../../components/Hero/HeroSection';
import Footer from "../../components/Hero/Footer";

export default function Home() {
  return (
    <main className="content-offset">
      <HeroSection />
      <Footer /> 
    </main>
  );
}

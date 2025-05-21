import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCarousel from '../components/ServiceCarousel';

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-wsmartbuy-primary via-wsmartbuy-secondary to-wsmartbuy-highlight">
              Redefine Your Style
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-wsmartbuy-text-muted">
              Experience the future of fashion shopping with AI-powered outfit recommendations and style analysis.
            </p>
            <Link to="/shop" className="try-now-btn bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight hover:from-wsmartbuy-highlight hover:to-wsmartbuy-primary text-wsmartbuy-text text-lg font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-glow transform hover:scale-105 inline-block">
              Try Now
            </Link>
          </div>
          
          {/* Floating elements with proper z-index */}
          <div className="absolute -top-10 right-1/4 h-8 w-8 rounded-full bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-secondary opacity-60 blur-md"></div>
          <div className="absolute top-1/3 left-1/4 h-12 w-12 rounded-full bg-gradient-to-r from-wsmartbuy-secondary to-wsmartbuy-highlight opacity-60 blur-md"></div>
          <div className="absolute bottom-1/4 right-1/4 h-10 w-10 rounded-full bg-gradient-to-r from-wsmartbuy-highlight to-wsmartbuy-primary opacity-60 blur-md"></div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 relative bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI-Powered Services</h2>
            <p className="text-wsmartbuy-text-muted max-w-2xl mx-auto">
              Discover how our cutting-edge AI technology can transform your shopping experience.
            </p>
          </div>
          
          <ServiceCarousel />

          <div className="text-center mt-16">
            <button className="bg-wsmartbuy-bg text-wsmartbuy-text border-2 border-wsmartbuy-secondary hover:border-wsmartbuy-primary px-6 py-3 rounded-full transition-all duration-300 font-medium">
              Explore All Features
            </button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 relative bg-gradient-to-b from-transparent to-wsmartbuy-dark/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-wsmartbuy-text-muted mb-8">
                Our AI analyzes thousands of fashion combinations to provide you with personalized recommendations that match your style preferences.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-secondary flex items-center justify-center text-wsmartbuy-text font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                    <p className="text-wsmartbuy-text-muted">Upload a photo of yourself or the clothing item you're interested in.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-wsmartbuy-secondary to-wsmartbuy-highlight flex items-center justify-center text-wsmartbuy-text font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                    <p className="text-wsmartbuy-text-muted">Our AI analyzes your style, color preferences, and body shape.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-wsmartbuy-highlight to-wsmartbuy-primary flex items-center justify-center text-wsmartbuy-text font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
                    <p className="text-wsmartbuy-text-muted">Receive personalized outfit recommendations and style advice.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-[0_0_30px_rgba(120,75,160,0.3)] border border-wsmartbuy-secondary/30 h-[500px] w-full">
                {/* Placeholder for app showcase image */}
                <div className="h-full w-full bg-gradient-to-br from-wsmartbuy-bg via-[#161616] to-[#1A1A1A] flex items-center justify-center">
                  <div className="text-center px-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-6 text-wsmartbuy-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xl font-semibold text-wsmartbuy-text">App Interface Preview</p>
                    <p className="text-wsmartbuy-text-muted mt-2">Smart, intuitive and personalized fashion recommendations</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -left-5 h-14 w-14 rounded-full bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-secondary opacity-70 blur-md"></div>
              <div className="absolute -bottom-5 -right-5 h-14 w-14 rounded-full bg-gradient-to-r from-wsmartbuy-highlight to-wsmartbuy-primary opacity-70 blur-md"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action Section */}
      <section className="py-16 md:py-24 relative bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Style?</h2>
            <p className="text-wsmartbuy-text-muted text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who have elevated their style with WSmartBuy's AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="try-now-btn bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight hover:from-wsmartbuy-highlight hover:to-wsmartbuy-primary text-wsmartbuy-text px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 inline-block">
                Get Started Now
              </Link>
              <button className="bg-transparent text-wsmartbuy-text border-2 border-wsmartbuy-secondary hover:border-wsmartbuy-primary px-8 py-4 rounded-full font-medium transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage; 
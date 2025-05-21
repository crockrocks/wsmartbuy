import React, { useState, useEffect } from 'react';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Outfit Recommendation",
      description: "Get personalized outfit recommendations based on your style, body type, and preferences using our AI-powered analysis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Similar Product Search",
      description: "Found something you like? Upload a photo and our AI will find similar products across thousands of brands instantly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Outfit Check",
      description: "Unsure about your outfit? Get instant feedback on your chosen combination and suggestions for improvements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full relative overflow-hidden py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {services.map((service) => (
            <div key={service.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-wsmartbuy-bg border border-wsmartbuy-secondary/30 rounded-xl p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:border-wsmartbuy-primary/50 hover:shadow-[0_0_15px_rgba(255,60,172,0.15)] backdrop-blur-sm">
                <div className="text-wsmartbuy-highlight mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-wsmartbuy-text mb-4">{service.title}</h3>
                <p className="text-wsmartbuy-text-muted">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-wsmartbuy-primary w-8' 
                  : 'bg-wsmartbuy-secondary/50 hover:bg-wsmartbuy-secondary'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Arrow buttons */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <button 
            onClick={() => setActiveIndex((activeIndex - 1 + services.length) % services.length)}
            className="h-10 w-10 rounded-full bg-wsmartbuy-bg/70 text-wsmartbuy-text flex items-center justify-center border border-wsmartbuy-secondary/30 hover:bg-wsmartbuy-bg transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <button 
            onClick={() => setActiveIndex((activeIndex + 1) % services.length)}
            className="h-10 w-10 rounded-full bg-wsmartbuy-bg/70 text-wsmartbuy-text flex items-center justify-center border border-wsmartbuy-secondary/30 hover:bg-wsmartbuy-bg transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel; 
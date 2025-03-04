// src/pages/Services.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      title: "Virtual Try On",
      description: "Experience clothes shopping like never before with our AI-powered virtual fitting room. Upload your photo and instantly see how different outfits would look on you. Make confident purchase decisions from the comfort of your home.",
      icon: <Camera className="w-12 h-12" />,
      link: "/virtual-try-on",
      features: [
        "Realistic clothing visualization",
        "Multiple angle views",
        "Size recommendations",
        "Share and save looks"
      ]
    },
    {
      title: "Shopping Assisstant",
      description: "Get smart shopping recommendations and manage your shopping lists with precise store locations for all your needs. Whether you're following a recipe or planning a party, we'll help you find everything efficiently with our intelligent store mapping system.",
      icon: <ShoppingBag className="w-12 h-12" />,
      link: "/item-suggestor",
      features: [
        "Smart ingredient lists",
        "Aisle locations",
        "Price comparisons",
        "Shopping list management"
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how wsmartbuy is revolutionizing the shopping experience with
            AI-powered solutions that save you time and make shopping more enjoyable.
          </p>
        </motion.div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="text-blue-600">{service.icon}</div>
                <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                <p className="text-lg text-gray-600">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try {service.title}
                </Link>
              </div>
              <div className={`bg-gray-100 rounded-xl p-8 aspect-square flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="text-6xl text-blue-600">
                  {service.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
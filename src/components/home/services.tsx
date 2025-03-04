import React from 'react';
import ServiceCard from './servicecard';
import { motion } from 'framer-motion';
import { Camera, ShoppingBag } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Virtual Try On",
      description: "Try clothes virtually with our AI-powered fitting room. Upload your photo and see how outfits look on you instantly.",
      icon: <Camera size={32} />,
      link: "/virtual-try-on"
    },
    {
      title: "Shopping Assisstant",
      description: "Get smart shopping lists and store locations for your recipes and needs. Save time and never miss an ingredient.",
      icon: <ShoppingBag size={32} />,
      link: "/item-suggestor"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Discover how we can make your shopping experience better
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
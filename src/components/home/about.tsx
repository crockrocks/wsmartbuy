import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Revolutionizing Your Shopping Experience
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            At wsmartbuy, we combine cutting-edge AI technology with everyday shopping
            needs to create a seamless, efficient, and enjoyable shopping experience.
            Our innovative solutions help you make confident purchases and save time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
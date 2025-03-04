import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link 
      to={link}
      className="group transform hover:scale-105 transition-all duration-300"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="text-blue-600 text-4xl group-hover:text-blue-700 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
          <span className="text-blue-600 group-hover:text-blue-700 inline-flex items-center">
            Learn more
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
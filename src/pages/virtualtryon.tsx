import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera } from 'lucide-react';

const VirtualTryOn: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Virtual Try On
        </h1>
        <p className="text-lg text-gray-600">
          See how clothes look on you before you buy them
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="userImage"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUserImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="userImage"
              className="cursor-pointer flex flex-col items-center"
            >
              <Camera className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-gray-600">Upload your photo</span>
            </label>
          </div>
          {userImage && (
            <div className="relative aspect-square">
              <img
                src={userImage}
                alt="User"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="clothingImage"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setClothingImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="clothingImage"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <span className="text-gray-600">Upload clothing item</span>
            </label>
          </div>
          {clothingImage && (
            <div className="relative aspect-square">
              <img
                src={clothingImage}
                alt="Clothing"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          disabled={!userImage || !clothingImage}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors
            ${userImage && clothingImage
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Generate Virtual Try On
        </button>
      </div>
    </div>
  );
};

export default VirtualTryOn;

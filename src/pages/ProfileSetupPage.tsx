import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    stylePreference: '',
    seasonalPreference: '',
    colorPreference: '',
    budgetRange: '',
    occasionPreference: '',
  });
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setError('');
    
    // Validation for step 1
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.age) {
        setError('Please fill in all required fields');
        return;
      }
      setStep(2);
      return;
    }
    
    // Validation for step 2
    if (step === 2) {
      if (!formData.height || !formData.weight || !formData.stylePreference) {
        setError('Please fill in all required fields');
        return;
      }
      setStep(3);
      return;
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Basic validation for step 3
    if (!formData.seasonalPreference || !formData.colorPreference || !formData.budgetRange || !formData.occasionPreference) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User ID not found. Please login again.');
      }
      
      const response = await fetch('http://localhost:5000/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          ...formData,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save preferences');
      }
      
      // Mark profile as complete
      localStorage.setItem('profileComplete', 'true');
      
      // Dispatch storage event for App.tsx to detect change
      window.dispatchEvent(new Event('storage'));
      
      // Redirect to shop page
      navigate('/shop');
    } catch (err: any) {
      setError(err.message || 'An error occurred saving your preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-wsmartbuy-bg/40 backdrop-blur-md border border-wsmartbuy-secondary/30 rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="text-wsmartbuy-primary">W</span>SmartBuy Profile Setup
        </h2>
        
        {/* Progress indicator */}
        <div className="flex mb-8 justify-center">
          <div className={`w-3 h-3 rounded-full mx-1 ${step >= 1 ? 'bg-wsmartbuy-primary' : 'bg-wsmartbuy-secondary/50'}`}></div>
          <div className={`w-3 h-3 rounded-full mx-1 ${step >= 2 ? 'bg-wsmartbuy-primary' : 'bg-wsmartbuy-secondary/50'}`}></div>
          <div className={`w-3 h-3 rounded-full mx-1 ${step >= 3 ? 'bg-wsmartbuy-primary' : 'bg-wsmartbuy-secondary/50'}`}></div>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-medium mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium mb-1">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-1">
                    Age *
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                    placeholder="25"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Body Measurements & Style */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-medium mb-4">Body Measurements & Style</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium mb-1">
                    Height (cm) *
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                    placeholder="175"
                  />
                </div>
                
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-1">
                    Weight (kg) *
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="30"
                    max="200"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                    placeholder="70"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="stylePreference" className="block text-sm font-medium mb-1">
                  Style Preference *
                </label>
                <select
                  id="stylePreference"
                  name="stylePreference"
                  value={formData.stylePreference}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                >
                  <option value="">Select Style</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="streetwear">Streetwear</option>
                  <option value="business-casual">Business Casual</option>
                  <option value="athletic">Athletic</option>
                  <option value="bohemian">Bohemian</option>
                  <option value="vintage">Vintage</option>
                  <option value="minimalist">Minimalist</option>
                </select>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="border border-wsmartbuy-secondary text-wsmartbuy-text py-2 px-6 rounded-md hover:bg-wsmartbuy-secondary/20 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-medium mb-4">Shopping Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="seasonalPreference" className="block text-sm font-medium mb-1">
                    Seasonal Preference *
                  </label>
                  <select
                    id="seasonalPreference"
                    name="seasonalPreference"
                    value={formData.seasonalPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                  >
                    <option value="">Select Season</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                    <option value="year-round">Year Round</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="colorPreference" className="block text-sm font-medium mb-1">
                    Color Preference *
                  </label>
                  <select
                    id="colorPreference"
                    name="colorPreference"
                    value={formData.colorPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                  >
                    <option value="">Select Color</option>
                    <option value="neutrals">Neutrals (Black, White, Gray)</option>
                    <option value="earth-tones">Earth Tones (Brown, Beige, Olive)</option>
                    <option value="cool-colors">Cool Colors (Blue, Green, Purple)</option>
                    <option value="warm-colors">Warm Colors (Red, Orange, Yellow)</option>
                    <option value="pastels">Pastels</option>
                    <option value="bold-colors">Bold Colors</option>
                    <option value="monochrome">Monochrome</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium mb-1">
                    Budget Range *
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                  >
                    <option value="">Select Budget</option>
                    <option value="budget">Budget-friendly</option>
                    <option value="mid-range">Mid-range</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="occasionPreference" className="block text-sm font-medium mb-1">
                    Occasion Preference *
                  </label>
                  <select
                    id="occasionPreference"
                    name="occasionPreference"
                    value={formData.occasionPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
                  >
                    <option value="">Select Occasion</option>
                    <option value="everyday">Everyday</option>
                    <option value="work">Work</option>
                    <option value="special-occasions">Special Occasions</option>
                    <option value="outdoor-activities">Outdoor Activities</option>
                    <option value="workouts">Workouts</option>
                    <option value="loungewear">Loungewear</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="border border-wsmartbuy-secondary text-wsmartbuy-text py-2 px-6 rounded-md hover:bg-wsmartbuy-secondary/20 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text py-2 px-6 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage; 